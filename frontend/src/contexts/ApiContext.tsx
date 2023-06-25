import React from 'react'
import { AuthenticationApi, CharacterApi, MapleGgFirebaseApi, TaskStatusApi } from 'ms-tracker-library'
import config from '../config/frontend.config.json'

interface Api {
  authenticationApi: AuthenticationApi
  taskStatusApi: TaskStatusApi
  characterApi: CharacterApi
  mapleGgFirebaseApi: MapleGgFirebaseApi
}

const ApiContext = React.createContext<Api | undefined>(undefined)

export const useApi = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return React.useContext(ApiContext)!
}

export const ApiContextProvider = (props: { children: React.ReactNode }) => {
  const authenticationApi = new AuthenticationApi(config)
  const taskStatusApi = new TaskStatusApi(config)
  const characterApi = new CharacterApi(config)
  const mapleGgFirebaseApi = new MapleGgFirebaseApi(config)

  const value: Api = {
    authenticationApi,
    taskStatusApi,
    characterApi,
    mapleGgFirebaseApi
  }

  return (
    <ApiContext.Provider value={value}>
      {props.children}
    </ApiContext.Provider>
  )
}
