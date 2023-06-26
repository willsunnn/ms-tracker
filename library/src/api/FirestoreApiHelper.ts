import {collection, doc, setDoc, getDoc, DocumentData, onSnapshot, CollectionReference, Firestore} from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Storable = Record<string, any>

export class FirestoreApiHelper {
  collection: CollectionReference;
  collectionName: string;

  constructor(firestore: Firestore, collectionName: string) {
    this.collection = collection(firestore, collectionName);
    this.collectionName = collectionName;
  }

  private getDocRef = (key: string) => {
    const docRef = doc(this.collection, key);
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
