import React from 'react'
import { type AuthenticationApi, type CharacterApi, type AdditionalCharacterInfoFirebaseApi, type TaskStatusApi, authenticationApi, characterApi, additionalCharacterInfoFirebaseApi, taskStatusApi } from 'ms-tracker-library'
import config from '../config/frontend.config.json'

interface Api {
  authenticationApi: AuthenticationApi
  taskStatusApi: TaskStatusApi
  characterApi: CharacterApi
  additionalCharacterInfoFirebaseApi: AdditionalCharacterInfoFirebaseApi
}

const ApiContext = React.createContext<Api | undefined>(undefined)

export const useApi = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return React.useContext(ApiContext)!
}

export const ApiContextProvider = (props: { children: React.ReactNode }) => {
  const value: Api = {
    authenticationApi: authenticationApi(config),
    taskStatusApi: taskStatusApi(config),
    characterApi: characterApi(config),
    additionalCharacterInfoFirebaseApi: additionalCharacterInfoFirebaseApi(config)
  }

  return (
    <ApiContext.Provider value={value}>
      {props.children}
    </ApiContext.Provider>
  )
}
