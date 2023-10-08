import React from 'react'
import { TaskViewByCharacter } from './characters/TaskViewByCharacters'
import { TaskViewByReset } from './todo/TaskTodo'
import { TaskViewCompact } from './overview/TaskOverview'
import { useAlertCallback } from '../../contexts/AlertContext'
import { PREDEFINED_TASKS } from '../../models/PredefinedTasks'
import { type AccountCharacters, type MapleGgCachedData, type TaskStatusForAccount, cacheKeyToString, getMapleGgCacheKey } from 'ms-tracker-library'
import { useApi } from '../../contexts/ApiContext'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { FullScreenLoader } from '../helper/Loader'
import { useFabContext } from '../../contexts/FabContext'
import { useTitle } from '../../contexts/TitleContext'
import { DataWrapper } from 'ms-tracker-library/lib/models/helper'

export const TaskViewPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const alert = useAlertCallback()
  const { mapleGgFirebaseApi, taskStatusApi, characterApi } = useApi()
  const { updateFab } = useFabContext()
  const { setTitleCharacter } = useTitle()

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
      const characterKeys = characters.characters.map((char) => ({ name: char.name, region: char.region }))
      const unsubFunc = mapleGgFirebaseApi.searchAndListen(
        characterKeys,
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
    mapleGgData: mapleGgCharacters.get(cacheKeyToString(getMapleGgCacheKey(character.name, character.region)))
  }))

  // Add the character to the FloationActionButton
  // so that it knows we are on a character view screen
  // and that it should render the AddCharacter and EditCharacterOrder
  React.useEffect(() => {
    updateFab(characterAndMapleGgData)
    setTitleCharacter(characterAndMapleGgData)
    return () => {
      updateFab(undefined)
      setTitleCharacter(undefined)
    }
  }, [characters, mapleGgCharacters])

  // if user is not logged in, navigate to the signin page
  if (user === null) {
    navigate('/signin')
    return <></>
  }

  // if user data hasn't loaded in yet display a loader
  if ((user === undefined) || (taskStatus === undefined) || (characters === undefined) || (characterAndMapleGgData === undefined)) {
    return <FullScreenLoader/>
  }

  // Now we know the user is signed in, we can render all the other components
  const data = new DataWrapper(user.uid, characterAndMapleGgData, PREDEFINED_TASKS, taskStatus)

  return (
    <Routes>
      <Route path="" element={(
        <div className="w-full">
          <Outlet/>
        </div>)}>
        <Route path="characters" element={(
          <TaskViewByCharacter data={data}/>
        )}/>
        <Route path="todo" element={(
          <TaskViewByReset data={data}/>
        )}/>
        <Route path="overview" element={(
          <TaskViewCompact data={data}/>
        )}/>
        {/* If path is blank or unknown navigate to characters page */}
        <Route path="*" element={(
          <Navigate to="/characters" replace={true}/>
        )}/>
        <Route path="" element={(
          <Navigate to="/characters" replace={true}/>
        )}/>
      </Route>
    </Routes>
  )
}
