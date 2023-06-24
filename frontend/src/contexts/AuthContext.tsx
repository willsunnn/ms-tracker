import * as FirebaseAuth from 'firebase/auth'
import React from 'react'
import { auth } from '../config/FirebaseConfig'

interface Auth {
  user: FirebaseAuth.User | null
  signUp: (email: string, password: string) => Promise<FirebaseAuth.User>
  signIn: (email: string, password: string) => Promise<FirebaseAuth.User>
  forgotPassword: (email: string) => Promise<void>
  signInWithGoogle: () => Promise<FirebaseAuth.User>
  signOut: () => Promise<void>
}

const throwNotImplemented = () => { throw new Error('Not Implemented') }
const AuthContext = React.createContext<Auth>({
  user: null,
  signUp: throwNotImplemented,
  signIn: throwNotImplemented,
  forgotPassword: throwNotImplemented,
  signInWithGoogle: throwNotImplemented,
  signOut: throwNotImplemented
})

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = React.useState<FirebaseAuth.User | null>(null)

  React.useEffect(() => {
    const firebaseUnsubscribeCallback = auth.onAuthStateChanged(setCurrentUser)
    return firebaseUnsubscribeCallback
  }, [])

  const signUp = async (email: string, password: string): Promise<FirebaseAuth.User> => {
    const userCredential = await FirebaseAuth.createUserWithEmailAndPassword(auth, email, password)
    return userCredential.user
  }

  const signIn = async (email: string, password: string): Promise<FirebaseAuth.User> => {
    const userCredential = await FirebaseAuth.signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  }

  const forgotPassword = async (email: string) => {
    await FirebaseAuth.sendPasswordResetEmail(auth, email)
  }

  const signInWithGoogle = async () => {
    const provider = new FirebaseAuth.GoogleAuthProvider()
    const userCredential = await FirebaseAuth.signInWithPopup(auth, provider)
    return userCredential.user
  }

  const signOut = async () => {
    await FirebaseAuth.signOut(auth)
  }

  const value: Auth = {
    user: currentUser,
    signUp,
    signIn,
    forgotPassword,
    signInWithGoogle,
    signOut
  }

  return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
  )
}
