import {collection, doc, setDoc, getDoc, DocumentData, onSnapshot, CollectionReference, Firestore} from "firebase/firestore";
import {FirestoreApiHelperBase, Storable} from "./FirestoreApiHelperBase";

export class FirestoreApiHelper extends FirestoreApiHelperBase {
  collection: CollectionReference;

  constructor(firestore: Firestore, collectionName: string) {
    super(collectionName);
    this.collection = collection(firestore, collectionName);
  }

  private getDocRef = (key: string) => {
    const docRef = doc(this.collection, key);
    return docRef;
  };

  // Override methods

  protected async write(id: string, data: Storable): Promise<void> {
    const docRef = this.getDocRef(id);
    await setDoc(docRef, data);
  }

  protected async read(id: string): Promise<Storable | undefined> {
    const docRef = this.getDocRef(id);
    const data = (await getDoc(docRef)).data();
    return data;
  }

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
