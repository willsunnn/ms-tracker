import {FirebaseOptions, initializeApp} from "firebase/app";
import {Auth, getAuth} from "firebase/auth";
import {Firestore, getFirestore, collection, doc, setDoc, getDoc, DocumentData, onSnapshot} from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Storable = Record<string, any>

export class FirestoreApiHelper {
  auth: Auth;
  db: Firestore;
  collectionName: string;

  constructor(config: FirebaseOptions, collectionName: string) {
    const app = initializeApp(config);
    this.auth = getAuth(app);
    this.db = getFirestore(app);
    this.collectionName = collectionName;
  }

  private getDocRef = (key: string) => {
    const collectionRef = collection(this.db, this.collectionName);
    const docRef = doc(collectionRef, key);
    return docRef;
  };

  // Storing Methods

  public set = async <T extends Storable>(key: string, data: T): Promise<string> => {
    try {
      const docRef = this.getDocRef(key);
      await setDoc(docRef, data);
      console.log(`Document written in ${this.collectionName} with ID ${docRef.id}`);
      return docRef.id;
    } catch (e) {
      console.error(`Error writing document to ${this.collectionName} ${JSON.stringify(data)} error=${JSON.stringify(e)}`);
      throw e;
    }
  };

  // Fetching Methods

  public get = async <T extends Storable>(key: string, defaultValue: () => T, parse: (_: DocumentData) => T): Promise<T> => {
    try {
      const docRef = this.getDocRef(key);
      const data = (await getDoc(docRef)).data();
      if (data === undefined) {
        console.log(`could not find document in ${this.collectionName} for key ${key}. Returning default value`);
        return defaultValue();
      } else {
        console.log(`found document in ${this.collectionName} with data=${JSON.stringify(data)}`);
        return parse(data);
      }
    } catch (e) {
      console.error(`Error fetching document from ${this.collectionName} error=${JSON.stringify(e)}`);
      throw e;
    }
  };

  public listen = <T extends Storable>(key: string, callback: (_: T) => void, errCallback: (_: unknown) => void, defaultValue: () => T, parse: (_: DocumentData) => T) => {
    try {
      const docRef = this.getDocRef(key);
      const unsubFunc = onSnapshot(docRef, (doc) => {
        try {
          const data = doc.data();
          if (data === undefined) {
            console.log(`could not find document in ${this.collectionName} for key ${key}. Returning default value`);
            callback(defaultValue());
          } else {
            console.log(`found document in ${this.collectionName} with data=${JSON.stringify(data)}`);
            callback(parse(data));
          }
        } catch (err) {
          errCallback(err);
        }
      });
      return unsubFunc;
    } catch (e) {
      console.error(`Error fetching document from ${this.collectionName} error=${JSON.stringify(e)}`);
      throw e;
    }
  };
}
