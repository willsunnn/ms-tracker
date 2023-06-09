import * as Firestore from 'firebase/firestore';
import { db } from '../config/FirebaseConfig';
import { UserData } from './types';

const userCollection = "UserData"

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
    storeData,
    getData,
}