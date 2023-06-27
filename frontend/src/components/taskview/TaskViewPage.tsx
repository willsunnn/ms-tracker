import React from 'react'
import { TaskViewByCharacter } from './TaskViewByCharacters'
import { TaskViewByReset } from './TaskViewByReset'
import { TaskViewCompact } from './TaskViewCompact'
import { type User } from 'firebase/auth'
import { useAlertCallback } from '../../contexts/AlertContext'
import { TASK_LIST } from '../../models/PredefinedTasks'
import { type TaskStatusForAccount, type Task, type AccountCharacters, defaultTaskStatusForAccount, defaultAccountCharacters, type MapleGgCachedData, type CharacterWithMapleGgData } from 'ms-tracker-library'
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
  taskStatus: TaskStatusForAccount
  tasks: Task[]
  characters: CharacterWithMapleGgData[]
  removeClear: (characterName: string, taskId: string) => Promise<void>
  addClear: (characterName: string, taskId: string, clearTime: Date) => Promise<void>
}

export const TaskViewPage = (props: { user: User }) => {
  const { user } = props
  const alert = useAlertCallback()

  const { mapleGgFirebaseApi, taskStatusApi, characterApi } = useApi()

  // React States
  const [tab, setTab] = React.useState<Tabs>('BY_CHARACTER')
  const [taskStatus, setTaskStatus] = React.useState<TaskStatusForAccount>(defaultTaskStatusForAccount)
  const [characters, setCharacters] = React.useState<AccountCharacters>(defaultAccountCharacters)
  const [mapleGgCharacters, setMapleGgCharacters] = React.useState<Map<string, MapleGgCachedData>>(new Map<string, MapleGgCachedData>())

  React.useEffect(() => {
    const stopTaskListen = taskStatusApi.listen(user, setTaskStatus, alert)
    const stopCharListen = characterApi.listen(user, setCharacters, alert)

    return () => {
      stopTaskListen()
      stopCharListen()
    }
  }, [])

  React.useEffect(() => {
    const characterNames = characters.characters.map((char) => char.name)
    const unsubFunc = mapleGgFirebaseApi.searchAndListen(
      characterNames,
      setMapleGgCharacters,
      alert)
    return unsubFunc
  }, [characters])

  const charactersWithMapleGgData: CharacterWithMapleGgData[] = characters.characters.map((character) => {
    return {
      ...character,
      mapleGgData: mapleGgCharacters.get(character.name)
    }
  })

  const taskViewProps = {
    taskStatus,
    tasks: TASK_LIST,
    characters: charactersWithMapleGgData,
    addClear: async (characterName: string, taskId: string, clearTime: Date) => {
      console.log(`adding clear for ${characterName} ${taskId} ${clearTime.toLocaleDateString()}`)
    },
    removeClear: async (characterName: string, taskId: string) => {
      console.log(`removing clear for ${characterName} ${taskId}`)
    }
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
