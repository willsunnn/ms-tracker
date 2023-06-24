import type * as FirebaseAuth from 'firebase/auth'
import React from 'react'
import { AuthenticationApi } from 'ms-tracker-library'

interface Auth {
  user: FirebaseAuth.User | null
  signUp: (email: string, password: string) => Promise<FirebaseAuth.User>
  signIn: (email: string, password: string) => Promise<FirebaseAuth.User>
  forgotPassword: (email: string) => Promise<void>
  signInWithGoogle: () => Promise<FirebaseAuth.User>
  signOut: () => Promise<void>
}

const AuthContext = React.createContext<Auth>({
  user: null,
  ...AuthenticationApi
})

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = React.useState<FirebaseAuth.User | null>(null)

  React.useEffect(() => {
    return AuthenticationApi.onAuthStateChanged(setCurrentUser)
  }, [])

  const value: Auth = {
    user: currentUser,
    ...AuthenticationApi
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}
