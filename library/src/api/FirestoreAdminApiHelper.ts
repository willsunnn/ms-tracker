import {CollectionReference, DocumentData, Firestore, Query} from "firebase-admin/firestore";
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

  private getQuery = (params: QueryParam[]) => {
    let query: CollectionReference<DocumentData> | Query<DocumentData> = this.firestore.collection(this.collectionName);
    params.forEach((param) => {
      query = query.where(param.property, param.op, param.value);
    });
    return query;
  };

  // Override methods

  protected async write(id: string, data: Storable): Promise<void> {
    const docRef = this.getDocRef(id);
    await docRef.set(data);
  }

  protected async read(id: string): Promise<Storable | undefined> {
    const docRef = this.getDocRef(id);
    return (await docRef.get()).data();
  }

  protected async find(params: QueryParam[]): Promise<Storable[]> {
    const query = this.getQuery(params);
    const snapshot = await query.get();
    const data = snapshot.docs.map((doc) => doc.data());
    return data;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public listen = <T extends Storable>(key: string, callback: (_: T) => void, errCallback: (_: unknown) => void, defaultValue: () => T, parse: (_: DocumentData) => T) => {
    throw new Error("function not implemented yet for FirestoreAdminApiHelper");
  };
}
