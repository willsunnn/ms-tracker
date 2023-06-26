import {DocumentData, Unsubscribe} from "firebase/firestore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Storable = Record<string, any>

export abstract class FirestoreApiHelperBase {
  collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  public set = async <T extends Storable>(key: string, data: T): Promise<string> => {
    try {
      await this.write(key, data);
      console.log(`Document written in ${this.collectionName} with key ${key}`);
      return key;
    } catch (e) {
      console.error(`Error writing document to ${this.collectionName} ${JSON.stringify(data)} error=${JSON.stringify(e)}`);
      throw e;
    }
  };

  public get = async <T extends Storable>(key: string, defaultValue: () => T, parse: (_: DocumentData) => T): Promise<T> => {
    try {
      const data = await this.read(key);
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

  abstract listen: <T extends Storable>(key: string, callback: (_: T) => void, errCallback: (_: unknown) => void, defaultValue: () => T, parse: (_: DocumentData) => T) => Unsubscribe

  protected abstract write(id: string, data: Storable): Promise<void>
  protected abstract read(id: string): Promise<Storable | undefined>
}
