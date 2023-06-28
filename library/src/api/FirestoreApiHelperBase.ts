import {DocumentData, QueryDocumentSnapshot, QuerySnapshot, Unsubscribe, WhereFilterOp, deleteDoc} from "firebase/firestore";
import {QuerySnapshot as QuerySnapshotAdmin, QueryDocumentSnapshot as QueryDocumentSnapshotAdmin} from "firebase-admin/firestore";

/* eslint @typescript-eslint/no-explicit-any: 0 */

export type Storable = Record<string, any>

export interface QueryParam {
  property: string,
  op: WhereFilterOp,
  value: any
}

export abstract class FirestoreApiHelperBase {
  collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  public set = async <T extends Storable>(key: string, data: T): Promise<string> => {
    try {
      await this._set(key, data);
      return key;
    } catch (e) {
      console.error(`Error writing document to ${this.collectionName} ${JSON.stringify(data)} error=${JSON.stringify(e)}`);
      throw e;
    }
  };

  public search = async <T extends Storable>(subpath: string, params: QueryParam[], parse: (_: DocumentData) => T): Promise<T[]> => {
    try {
      const snapshot = await this._search(subpath, params);
      const data: T[] = snapshot.docs.map((doc) => parse(doc.data()));
      return data;
    } catch (e) {
      console.error(`Error fetching document from ${this.collectionName} error=${JSON.stringify(e)}`);
      throw e;
    }
  };

  public get = async <T extends Storable>(key: string, parse: (_: DocumentData) => T): Promise<T|undefined> => {
    try {
      const data = await this._get(key);
      if (data === undefined) {
        return undefined;
      } else {
        return parse(data);
      }
    } catch (e) {
      console.error(`Error fetching document from ${this.collectionName} error=${JSON.stringify(e)}`);
      throw e;
    }
  };

  public delete = async (subpath: string, params: QueryParam[]): Promise<number> => {
    try {
      const snapshot = await this._search(subpath, params);
      const updates = snapshot.docs.map(async (doc) => {
        if (doc instanceof QueryDocumentSnapshot) {
          return await deleteDoc((doc as QueryDocumentSnapshot).ref);
        } else {
          return await (doc as QueryDocumentSnapshotAdmin).ref.delete();
        }
      });
      await Promise.all(updates);
      return snapshot.docs.length;
    } catch (e) {
      console.error(`Error deleting documents where ${JSON.stringify(params)}`);
      throw e;
    }
  };

  public getOrDefault = async <T extends Storable>(key: string, defaultValue: () => T, parse: (_: DocumentData) => T): Promise<T> => {
    const data = await this.get(key, parse);
    return data ?? defaultValue();
  };

  abstract listen: <T extends Storable>(key: string, callback: (_: T) => void, errCallback: (_: unknown) => void, defaultValue: () => T, parse: (_: DocumentData) => T) => Unsubscribe
  abstract searchAndListen: <T extends Storable>(subpath: string, params: QueryParam[], callback: (_:T[]) => void, errCallback: (_: unknown) => void, parse: (_: DocumentData) => T) => Unsubscribe

  protected abstract _set(id: string, data: Storable): Promise<void>
  protected abstract _get(id: string): Promise<Storable | undefined>
  protected abstract _search(subpath: string, params: QueryParam[]): Promise<QuerySnapshot<DocumentData>|QuerySnapshotAdmin<DocumentData>>
}
