import {collection, doc, setDoc, getDoc, getDocs, DocumentData, onSnapshot, Firestore, query, where, QuerySnapshot} from "firebase/firestore";
import {FirestoreApiHelperBase, QueryParam, Storable} from "./FirestoreApiHelperBase";

export class FirestoreApiHelper extends FirestoreApiHelperBase {
  firestore: Firestore;

  constructor(firestore: Firestore, collectionName: string) {
    super(collectionName);
    this.firestore = firestore;
  }

  private getDocRef = (key: string) => {
    const collectionRef = collection(this.firestore, this.collectionName);
    const docRef = doc(collectionRef, key);
    return docRef;
  };

  private getQuery = (subpath: string, params: QueryParam[]) => {
    const whereClauses = params.map((param) => where(param.property, param.op, param.value));
    const collectionRef = collection(this.firestore, `${this.collectionName}${subpath}`);
    return query(collectionRef, ...whereClauses);
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

  protected async _search(subpath: string, params: QueryParam[]): Promise<QuerySnapshot<DocumentData>> {
    const query = this.getQuery(subpath, params);
    const snapshot = await getDocs(query);
    return snapshot;
  }

  public searchAndListen = <T extends Storable>(subpath: string, params: QueryParam[], callback: (_:T[]) => void, errCallback: (_: unknown) => void, parse: (_: DocumentData) => T) => {
    try {
      const query = this.getQuery(subpath, params);
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
