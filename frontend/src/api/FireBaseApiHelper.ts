import * as Firestore from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

type Storable = { 
    [x: string]: any;
}

const getDocRef = (key: string, collectionName: string) => {
    const collectionRef = Firestore.collection(db, collectionName);
    const docRef = Firestore.doc(collectionRef, key);
    return docRef
}

// Storing Methods

const set = async <T extends Storable>(key: string, collectionName: string, data: T): Promise<String> => {
    try {
        const docRef = getDocRef(key, collectionName);
        await Firestore.setDoc(docRef, data);
        console.log(`Document written in ${collectionName} with ID ${docRef.id}`)
        return docRef.id;
    } catch (e) {
        console.error(`Error writing document to ${collectionName} ${JSON.stringify(data)} error=${e}`)
        throw e;
    }
}

// Fetching Methods

const get = async <T extends Storable>(key: string, collectionName: string, defaultValue:()=>T, parse:(_:Firestore.DocumentData)=>T): Promise<T> => {
    try {
        const docRef = getDocRef(key, collectionName);
        const data = (await Firestore.getDoc(docRef)).data();
        if (data === undefined) {
            console.log(`could not find document in ${collectionName} for key ${key}. Returning default value`);
            return defaultValue();
        } else {
            console.log(`found document in ${collectionName} with data=${JSON.stringify(data)}`)
            return parse(data);
        }
    } catch (e) {
        console.error(`Error fetching document from ${collectionName} error=${e}`)
        throw e;
    }

}

const listen = <T extends Storable>(key: string, collectionName: string, callback:(_:T)=>void, errCallback:(_:any)=>void, defaultValue:()=>T, parse:(_:Firestore.DocumentData)=>T) => {
    try {
        const docRef = getDocRef(key, collectionName);
        const unsubFunc = Firestore.onSnapshot(docRef, (doc)=>{
            try {
                const data = doc.data();
                if (data === undefined) {
                    console.log(`could not find document in ${collectionName} for key ${key}. Returning default value`);
                    callback(defaultValue());
                } else {
                    console.log(`found document in ${collectionName} with data=${JSON.stringify(data)}`)
                    callback(parse(data));
                }
            } catch (err) {
                errCallback(err)
            }
        });
        return unsubFunc
    } catch (e) {
        console.error(`Error fetching document from ${collectionName} error=${e}`)
        throw e;
    }
}

export const FireBaseApiHelper = {
    set,
    get,
    listen
}