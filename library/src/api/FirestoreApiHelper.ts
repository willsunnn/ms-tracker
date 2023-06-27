import {collection, doc, setDoc, getDoc, getDocs, DocumentData, onSnapshot, CollectionReference, Firestore, query, where, QuerySnapshot} from "firebase/firestore";
import {FirestoreApiHelperBase, QueryParam, Storable} from "./FirestoreApiHelperBase";

export class FirestoreApiHelper extends FirestoreApiHelperBase {
  collection: CollectionReference;
  firestore: Firestore;

  constructor(firestore: Firestore, collectionName: string) {
    super(collectionName);
    this.firestore = firestore;
    this.collection = collection(firestore, collectionName);
  }

  private getDocRef = (key: string) => {
    const docRef = doc(this.collection, key);
    return docRef;
  };

  private getQuery = (params: QueryParam[]) => {
    const whereClauses = params.map((param) => where(param.property, param.op, param.value));
    return query(this.collection, ...whereClauses);
  };

  // Override methods

  protected async _set(id: string, data: Storable): Promise<void> {
    const docRef = this.getDocRef(id);
    await setDoc(docRef, data);
  }

  protected async _get(id: string): Promise<Storable | undefined> {
    const docRef = this.getDocRef(id);
    const data = (await getDoc(docRef)).data();
    return data;
  }

  protected async _search(params: QueryParam[]): Promise<QuerySnapshot<DocumentData>> {
    const query = this.getQuery(params);
    const snapshot = await getDocs(query);
    return snapshot;
  }

  public searchAndListen = <T extends Storable>(params: QueryParam[], callback: (_:T[]) => void, errCallback: (_: unknown) => void, parse: (_: DocumentData) => T) => {
    try {
      const query = this.getQuery(params);
      const unsubFunc = onSnapshot(query, (docs) => {
        try {
          const retValue: T[] = [];
          docs.forEach((doc) => {
            const data = parse(doc.data());
            retValue.push(data);
          });
          callback(retValue);
        } catch (err) {
          errCallback(err);
        }
      });
      return unsubFunc;
    } catch (e) {
      console.error(`Error searching and listening to documents from ${this.collectionName} params=${JSON.stringify(params)} error=${JSON.stringify(e)}`);
      throw e;
    }
  };

  public listen = <T extends Storable>(key: string, callback: (_: T) => void, errCallback: (_: unknown) => void, defaultValue: () => T, parse: (_: DocumentData) => T) => {
    try {
      const docRef = this.getDocRef(key);
      const unsubFunc = onSnapshot(docRef, (doc) => {
        try {
          const data = doc.data();
          const retValue = (data) ? parse(data) : defaultValue();
          callback(retValue);
        } catch (err) {
          errCallback(err);
        }
      });
      return unsubFunc;
    } catch (e) {
      console.error(`Error initializing listening to document from ${this.collectionName} key=${key} error=${JSON.stringify(e)}`);
      throw e;
    }
  };
}
