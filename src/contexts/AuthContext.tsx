import * as Auth from "firebase/auth";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../config/FirebaseConfig";

type Auth = {
    user: Auth.User|null,
    signUp: (email: string, password: string) => Promise<Auth.User>,
    signIn: (email: string, password: string) => Promise<Auth.User>,
    forgotPassword: (email: string) => Promise<void>,
    signInWithGoogle: () => Promise<Auth.User>,
    signOut: () => Promise<void>,
}

const AuthContext = React.createContext<Auth|undefined>(undefined);

export const useAuth = () => {
    return useContext(AuthContext)!
}

export const AuthContextProvider = (props: { children: ReactNode}) => {
    const [currentUser, setCurrentUser] = useState<Auth.User|null>(null);

    useEffect(() => {
        const firebaseUnsubscribeCallback = auth.onAuthStateChanged(setCurrentUser);
        return firebaseUnsubscribeCallback;
    }, []);
    
    const signUp = async (email: string, password: string): Promise<Auth.User> => {
        const userCredential = await Auth.createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user
    }

    const signIn = async (email: string, password: string): Promise<Auth.User> => {
        const userCredential = await Auth.signInWithEmailAndPassword(auth, email, password);
        return userCredential.user
    }

    const forgotPassword = async(email: string) => {
        await Auth.sendPasswordResetEmail(auth, email);
    }

    const signInWithGoogle = async () => {
        const provider = new Auth.GoogleAuthProvider();
        const userCredential = await Auth.signInWithPopup(auth, provider);
        return userCredential.user;
    }

    const signOut = async() => {
        await Auth.signOut(auth);
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
    );

}