import React from 'react'
import { TaskViewByCharacter } from './characters/TaskViewByCharacters'
import { TaskViewByReset } from './TaskViewByReset'
import { TaskViewCompact } from './overview/TaskOverview'
import { type User } from 'firebase/auth'
import { useAlertCallback } from '../../contexts/AlertContext'
import { TASK_LIST } from '../../models/PredefinedTasks'
import { type Task, type AccountCharacters, type MapleGgCachedData, type CharacterWithMapleGgData, type TaskStatusForAccount } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FullScreenLoader } from '../helper/Loader'
import { useFabContext } from '../../contexts/FabContext'

export interface TaskViewProps {
  user: User
  taskStatus: TaskStatusForAccount
  tasks: Task[]
  characters: CharacterWithMapleGgData[]
}

export const TaskViewPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const alert = useAlertCallback()
  const { mapleGgFirebaseApi, taskStatusApi, characterApi } = useApi()
  const { updateFab } = useFabContext()

  // React States
  const [taskStatus, setTaskStatus] = React.useState<TaskStatusForAccount>()
  const [characters, setCharacters] = React.useState<AccountCharacters>()
  const [mapleGgCharacters, setMapleGgCharacters] = React.useState<Map<string, MapleGgCachedData>>(new Map<string, MapleGgCachedData>())

  // Fetch & Listen for TaskStatuses and Characters
  React.useEffect(() => {
    if (user) {
      const stopTaskListen = taskStatusApi.searchAndListen(user, setTaskStatus, alert)
      const stopCharListen = characterApi.listen(user, setCharacters, alert)
      return () => {
        stopTaskListen()
        stopCharListen()
      }
    }
  }, [user])

  // When we have all the character names loaded in, we need to perform a
  // second query to get the image data
  React.useEffect(() => {
    if (characters !== undefined) {
      const characterNames = characters.characters.map((char) => char.name)
      const unsubFunc = mapleGgFirebaseApi.searchAndListen(
        characterNames,
        setMapleGgCharacters,
        alert)
      return unsubFunc
    }
  }, [characters])

  // If the cached data of any of the characters is more than a day old, we
  // call the endpoint to refresh the data. The data will be returned
  // asynchronously through the listen hook
  React.useEffect(() => {
    let charactersAreUpToDate = true
    mapleGgCharacters.forEach((character) => {
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
  }, [mapleGgCharacters])

  // Join the character data with the mapleGgData
  const characterAndMapleGgData = characters?.characters.map((character) => ({
    ...character,
    mapleGgData: mapleGgCharacters.get(character.name.toLowerCase())
  }))

  // Add the character to the FloationActionButton
  // so that it knows we are on a character view screen
  // and that it should render the AddCharacter and EditCharacterOrder
  React.useEffect(() => {
    updateFab(characterAndMapleGgData)
    return () => {
      updateFab(undefined)
    }
  }, [characters, mapleGgCharacters])

  // if user is not logged in, navigate to the signin page
  if (user === null) {
    navigate('signin')
    return <></>
  }

  // if user data hasn't loaded in yet display a loader
  if ((user === undefined) || (taskStatus === undefined) || (characters === undefined) || (characterAndMapleGgData === undefined)) {
    return <FullScreenLoader/>
  }

  // Now we know the user is signed in, we can render all the other components
  const taskViewProps: TaskViewProps = {
    user,
    taskStatus,
    tasks: TASK_LIST,
    characters: characterAndMapleGgData
  }

  return (
    <Routes>
      <Route path="" element={(
        <div className="w-full">
          <Outlet/>
        </div>)}>
        <Route path="characters" element={(
          <TaskViewByCharacter taskViewAttrs={taskViewProps}/>
        )}/>
        <Route path="todo" element={(
          <TaskViewByReset taskViewAttrs={taskViewProps}/>
        )}/>
        <Route path="overview" element={(
          <TaskViewCompact taskViewAttrs={taskViewProps}/>
        )}/>
        {/* If path is blank or unknown navigate to characters page */}
        <Route path="*" element={(
          <Navigate to="characters" replace={true}/>
        )}/>
        <Route path="" element={(
          <Navigate to="characters" replace={true}/>
        )}/>
      </Route>
    </Routes>
  )
}
