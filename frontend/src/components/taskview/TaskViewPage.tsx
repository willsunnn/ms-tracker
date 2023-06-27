import React from 'react'
import { TaskViewByCharacter } from './TaskViewByCharacters'
import { TaskViewByReset } from './TaskViewByReset'
import { TaskViewCompact } from './TaskViewCompact'
import { type User } from 'firebase/auth'
import { useAlertCallback } from '../../contexts/AlertContext'
import { TASK_LIST } from '../../models/PredefinedTasks'
import { type Task, type AccountCharacters, defaultAccountCharacters, type MapleGgCachedData, type CharacterWithMapleGgData, type TaskStatusForAccount, emptyTaskStatusForAcccount } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'

type Tabs = 'BY_CHARACTER' | 'BY_RESET_DATE' | 'COMPACT'

const TabLabel = (props: { tabText: string, tabTag: Tabs, selectedTab: Tabs, setTab: (_: Tabs) => void }) => {
  const { tabText, tabTag, selectedTab } = props
  const onClick = () => {
    props.setTab(tabTag)
  }
  return (
    <a className={`tab tab-lifted ${tabTag === selectedTab ? 'tab-active' : ''}`} onClick={onClick}>{tabText}</a>
  )
}

export interface TaskViewProps {
  user: User
  taskStatus: TaskStatusForAccount
  tasks: Task[]
  characters: CharacterWithMapleGgData[]
}

export const TaskViewPage = (props: { user: User }) => {
  const { user } = props

  const alert = useAlertCallback()
  const { mapleGgFirebaseApi, taskStatusApi, characterApi } = useApi()

  // React States
  const [tab, setTab] = React.useState<Tabs>('BY_CHARACTER')
  const [taskStatus, setTaskStatus] = React.useState<TaskStatusForAccount>(emptyTaskStatusForAcccount())
  const [characters, setCharacters] = React.useState<AccountCharacters>(defaultAccountCharacters)
  const [mapleGgCharacters, setMapleGgCharacters] = React.useState<Map<string, MapleGgCachedData>>(new Map<string, MapleGgCachedData>())

  // Listen to the TaskStatuses and the Characters
  React.useEffect(() => {
    const stopTaskListen = taskStatusApi.searchAndListen(user, setTaskStatus, alert)
    const stopCharListen = characterApi.listen(user, setCharacters, alert)

    return () => {
      stopTaskListen()
      stopCharListen()
    }
  }, [])

  // If the cached data of any of the characters is more than a day old, we
  // call the endpoint to refresh the data. The data will be returned
  // asynchronously
  const mapleGgCharactersUpdated = (data: Map<string, MapleGgCachedData>) => {
    let charactersAreUpToDate = true
    data.forEach((character) => {
      const now = new Date().getTime()
      const millisInADay = 1000 * 60 * 60 * 24
      const lastFetch = character.lastRetrievedTimestamp
      const lastFetchIsRecent = (lastFetch && ((now - lastFetch) < millisInADay))
      if (!lastFetchIsRecent) {
        charactersAreUpToDate = false
      }
    })
    if (!charactersAreUpToDate) {
      mapleGgFirebaseApi.updateCharacter().then(console.log).catch(alert)
    }
    setMapleGgCharacters(data)
  }

  // When we have all the character names loaded in, we need to perform a
  // second query to get the image data
  React.useEffect(() => {
    const characterNames = characters.characters.map((char) => char.name)
    const unsubFunc = mapleGgFirebaseApi.searchAndListen(
      characterNames,
      mapleGgCharactersUpdated,
      alert)
    return unsubFunc
  }, [characters])

  // Join the data etc. and pass it to the views
  const charactersWithMapleGgData: CharacterWithMapleGgData[] = characters.characters.map((character) => {
    return {
      ...character,
      mapleGgData: mapleGgCharacters.get(character.name.toLowerCase())
    }
  })

  const taskViewProps = {
    user,
    taskStatus,
    tasks: TASK_LIST,
    characters: charactersWithMapleGgData
  }

  return (
    <div className="p-5 w-full">
      <div className="tabs mb-3 w-full">
        <TabLabel tabText="Characters" tabTag="BY_CHARACTER" selectedTab={tab} setTab={setTab}/>
        <TabLabel tabText="Tasks by Reset Time" tabTag="BY_RESET_DATE" selectedTab={tab} setTab={setTab}/>
        <TabLabel tabText="Compact" tabTag="COMPACT" selectedTab={tab} setTab={setTab}/>
      </div>
      { tab === 'BY_CHARACTER' && <TaskViewByCharacter taskViewAttrs={taskViewProps}/>}
      { tab === 'BY_RESET_DATE' && <TaskViewByReset taskViewAttrs={taskViewProps}/>}
      { tab === 'COMPACT' && <TaskViewCompact taskViewAttrs={taskViewProps}/>}
    </div>
  )
}
