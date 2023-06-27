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

  protected async _set(id: string, data: Storable): Promise<void> {
    const docRef = this.getDocRef(id);
    await docRef.set(data);
  }

  protected async _get(id: string): Promise<Storable | undefined> {
    const docRef = this.getDocRef(id);
    return (await docRef.get()).data();
  }

  protected async _search(subpath: string, params: QueryParam[]): Promise<QuerySnapshot<DocumentData>> {
    const query = this.getQuery(subpath, params);
    const snapshot = await query.get();
    return snapshot;
  }

  public searchAndListen = () => {
    throw new Error("function not implemented yet for FirestoreAdminApiHelper");
  };

  public listen = () => {
    throw new Error("function not implemented yet for FirestoreAdminApiHelper");
  };
}
