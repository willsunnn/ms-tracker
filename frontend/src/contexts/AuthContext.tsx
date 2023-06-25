import type * as FirebaseAuth from 'firebase/auth'
import React from 'react'
import { useApi } from './ApiContext'

interface Auth {
  user: FirebaseAuth.User | null
  signUp: (email: string, password: string) => Promise<FirebaseAuth.User>
  signIn: (email: string, password: string) => Promise<FirebaseAuth.User>
  forgotPassword: (email: string) => Promise<void>
  signInWithGoogle: () => Promise<FirebaseAuth.User>
  signOut: () => Promise<void>
}

const throwErr = () => { throw new Error('Not implemented yet') }
const AuthContext = React.createContext<Auth>({
  user: null,
  signUp: throwErr,
  signIn: throwErr,
  forgotPassword: throwErr,
  signInWithGoogle: throwErr,
  signOut: throwErr
})

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = React.useState<FirebaseAuth.User | null>(null)
  const { authenticationApi } = useApi()

  React.useEffect(() => {
    return authenticationApi.onAuthStateChanged(setCurrentUser)
  }, [])

  const value: Auth = {
    user: currentUser,
    ...authenticationApi
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
