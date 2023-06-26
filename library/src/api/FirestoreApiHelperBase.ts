import {DocumentData, Unsubscribe, WhereFilterOp} from "firebase/firestore";

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
      await this.write(key, data);
      return key;
    } catch (e) {
      console.error(`Error writing document to ${this.collectionName} ${JSON.stringify(data)} error=${JSON.stringify(e)}`);
      throw e;
    }
  };

  public search = async <T extends Storable>(params: QueryParam[], parse: (_: DocumentData) => T): Promise<T[]> => {
    try {
      const documents = await this.find(params);
      const data = documents.map((storable) => parse(storable));
      return data;
    } catch (e) {
      console.error(`Error fetching document from ${this.collectionName} error=${JSON.stringify(e)}`);
      throw e;
    }
  };

  public get = async <T extends Storable>(key: string, parse: (_: DocumentData) => T): Promise<T|undefined> => {
    try {
      const data = await this.read(key);
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

  public getOrDefault = async <T extends Storable>(key: string, defaultValue: () => T, parse: (_: DocumentData) => T): Promise<T> => {
    const data = await this.get(key, parse);
    return data ?? defaultValue();
  };

  abstract listen: <T extends Storable>(key: string, callback: (_: T) => void, errCallback: (_: unknown) => void, defaultValue: () => T, parse: (_: DocumentData) => T) => Unsubscribe

  protected abstract write(id: string, data: Storable): Promise<void>
  protected abstract read(id: string): Promise<Storable | undefined>
  protected abstract find(params: QueryParam[]): Promise<Storable[]>
}
