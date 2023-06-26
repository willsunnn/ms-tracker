import {type User} from "firebase/auth";
import {AccountCharacters, type Character, defaultAccountCharacters} from "../models";
import {FirebaseOptions, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {FirestoreApiHelperBase} from "./FirestoreApiHelperBase";
import {FirestoreApiHelper} from "./FirestoreApiHelper";
import {Firestore as FirestoreAdmin} from "firebase-admin/firestore";
import {FirestoreAdminApiHelper} from "./FirestoreAdminApiHelper";

const CHARACTER_COLLECTION = "Character";

export class CharacterApi {
  api: FirestoreApiHelperBase;

  constructor(api: (collectionName: string) => FirestoreApiHelperBase) {
    this.api = api(CHARACTER_COLLECTION);
  }

  // Set Methods

  public setUsingUid = async (uid: string, data: AccountCharacters): Promise<string> => {
    return await this.api.set(uid, data);
  };

  public set = async (user: User, data: AccountCharacters): Promise<string> => {
    return await this.setUsingUid(user.uid, data);
  };

  // Get Methods

  public getUsingUid = async (uid: string): Promise<AccountCharacters> => {
    return await this.api.get(uid, defaultAccountCharacters, AccountCharacters.parse);
  };

  public get = async (user: User): Promise<AccountCharacters> => {
    return await this.getUsingUid(user.uid);
  };

  public listen = (user: User, callback: (_: AccountCharacters) => void, errCallback: (_: unknown) => void) => {
    return this.api.listen(user.uid, callback, errCallback, defaultAccountCharacters, AccountCharacters.parse);
  };

  // Modify Helper Methods (these should be transactional)

  public addCharacter = async (user: User, newCharacter: Character): Promise<AccountCharacters> => {
    if (newCharacter.name.trim().length === 0) throw new Error("Character name is invalid");
    const characters = await this.get(user);
    const alrHasCharacter = characters.characters.find((c) => c.name === newCharacter.name);
    if (!alrHasCharacter) {
      throw new Error(`cannot add ${newCharacter.name} as ${newCharacter.name} already exists`);
    } else {
      characters.characters.push(newCharacter);
      await this.set(user, characters);
      return characters;
    }
  };
}

export const characterApi = (config: FirebaseOptions) => {
  const app = initializeApp(config);
  const firestore = getFirestore(app);
  return new CharacterApi((collectionName) => new FirestoreApiHelper(firestore, collectionName));
};

export const characterApiAdmin = (firestore: FirestoreAdmin) => {
  return new CharacterApi((collectionName) => new FirestoreAdminApiHelper(firestore, collectionName));
};
