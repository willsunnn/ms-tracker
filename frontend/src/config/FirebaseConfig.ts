import { FirebaseOptions, initializeApp } from "firebase/app";
import config from './firebase.config.json'
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const FirebaseConfig: FirebaseOptions = config;

export const app = initializeApp(FirebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
