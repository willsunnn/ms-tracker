import {CollectionReference, DocumentData, Firestore, Query, QuerySnapshot} from "firebase-admin/firestore";
import {FirestoreApiHelperBase, QueryParam, Storable} from "./FirestoreApiHelperBase";

export class FirestoreAdminApiHelper extends FirestoreApiHelperBase {
  firestore: Firestore;

  constructor(firestore: Firestore, collectionName: string) {
    super(collectionName);
    this.firestore = firestore;
  }

  private getDocRef = (key: string) => {
    return this.firestore.doc(`${this.collectionName}/${key}`);
  };

  private getQuery = (subpath: string, params: QueryParam[]) => {
    let query: CollectionReference<DocumentData> | Query<DocumentData> = this.firestore.collection(`${this.collectionName}${subpath}`);
    params.forEach((param) => {
      query = query.where(param.property, param.op, param.value);
    });
    return query;
  };

  // Override methods

  protected _set = async (key: string, data: Storable): Promise<void> => {
    const docRef = this.getDocRef(key);
    await docRef.set(data);
  };

  protected _get = async (key: string): Promise<Storable | undefined> => {
    const docRef = this.getDocRef(key);
    return (await docRef.get()).data();
  };

  protected _search = async (subpath: string, params: QueryParam[]): Promise<QuerySnapshot<DocumentData>> => {
    const query = this.getQuery(subpath, params);
    const snapshot = await query.get();
    return snapshot;
  };

  public delete = async (key: string) => {
    const docRef = this.getDocRef(key);
    await docRef.delete();
  };

  public searchAndDelete = async (subpath: string, params: QueryParam[]): Promise<number> => {
    const snapshot = await this._search(subpath, params);
    const updates = snapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(updates);
    return snapshot.docs.length;
  };

  public searchAndListen = () => {
    throw new Error("function not implemented yet for FirestoreAdminApiHelper");
  };

  public listen = () => {
    throw new Error("function not implemented yet for FirestoreAdminApiHelper");
  };
}
