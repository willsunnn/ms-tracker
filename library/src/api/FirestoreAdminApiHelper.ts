import {DocumentData, Firestore} from "firebase-admin/firestore";
import {FirestoreApiHelperBase, Storable} from "./FirestoreApiHelperBase";

export class FirestoreAdminApiHelper extends FirestoreApiHelperBase {
  firestore: Firestore;

  constructor(firestore: Firestore, collectionName: string) {
    super(collectionName);
    this.firestore = firestore;
  }

  private getDocRef = (key: string) => {
    return this.firestore.doc(`${this.collectionName}/${key}`);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public listen = <T extends Storable>(key: string, callback: (_: T) => void, errCallback: (_: unknown) => void, defaultValue: () => T, parse: (_: DocumentData) => T) => {
    throw new Error("function not implemented yet for FirestoreAdminApiHelper");
  };
}
