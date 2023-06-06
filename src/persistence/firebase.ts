import { initializeApp } from 'firebase/app';
import * as Firestore from 'firebase/firestore';
import * as Auth from 'firebase/auth';
import FirebaseConfig from '../config/FirebaseConfig';
import { UserData } from './types';

const app = initializeApp(FirebaseConfig);
const auth = Auth.getAuth(app);
const db: Firestore.Firestore = Firestore.getFirestore(app);

const userCollection = "UserData"

const createUser = async (email: string, password: string): Promise<Auth.User> => {
    const userCredential = await Auth.createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user
}

const signInUser = async (email: string, password: string): Promise<Auth.User> => {
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

const onUserChange = (handler: (_: Auth.User|null) => void) => {
    Auth.onAuthStateChanged(auth, handler);
}

const storeData = async (userData: UserData): Promise<String> => {
    try {
        const docRef = await Firestore.addDoc(Firestore.collection(db, userCollection), userData);
        console.log(`Document written with ID ${docRef.id}`)
        return docRef.id;
    } catch (e) {
        console.error(`Error writing document ${JSON.stringify(userData)} error=${e}`)
        throw e;
    }
}

const getData = async (): Promise<UserData> => {
    try {
        // const userData = await Firestore.getDoc(Firestore.collection(db, userCollection),)
        const userData = {
            characters: [],
            userId: "123",
        }
        return userData;
    } catch (e) {
        console.error(`Error fetching document error=${e}`)
        throw e;
    }
}

export const Persistence = {
    createUser,
    signInUser,
    signInWithGoogle,
    signOut,
    onUserChange,
    forgotPassword,
    storeData,
    getData,
}