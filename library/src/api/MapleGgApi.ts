import {FirebaseOptions, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {Firestore as FirestoreAdmin} from "firebase-admin/firestore";
import {Functions, getFunctions, httpsCallable} from "firebase/functions";
import {MapleGgCachedData} from "../models";
import {FirestoreApiHelper} from "./FirestoreApiHelper";
import {FirestoreApiHelperBase} from "./FirestoreApiHelperBase";
import {FirestoreAdminApiHelper} from "./FirestoreAdminApiHelper";

export class MapleGgFirebaseApi {
  public static readonly MAPLE_GG_COLLECTION = "MapleGgCharacter";

  functions: Functions | undefined;
  api: FirestoreApiHelperBase;

  constructor(functions: Functions | undefined, api: (collectionName: string) => FirestoreApiHelperBase) {
    this.functions = functions;
    this.api = api(MapleGgFirebaseApi.MAPLE_GG_COLLECTION);
  }

  public search = async (characterNames: string[]): Promise<Map<string, MapleGgCachedData>> => {
    // firebase throws an error if in clause has 0 entries
    if (characterNames.length == 0) {
      return new Map();
    }

    // get list of results
    const retrieved = await this.api.search([{
      property: "name",
      op: "in",
      value: characterNames,
    }], MapleGgCachedData.parse);

    // convert it to a map for easier reading
    return new Map(retrieved.map((char) => [char.name, char]));
  };

  public set = async (character: MapleGgCachedData) => {
    return this.api.set(character.name, character);
  };

  public updateCharacter = async (uid: string) => {
    if (this.functions) {
      const func = httpsCallable(this.functions, "updateCharacterHttpCall");
      return await func({});
    } else {
      throw new Error("MapleGgFirebaseApi.functions is undefined");
    }
  };
}

export const mapleGgFirebaseApi = (config: FirebaseOptions) => {
  const app = initializeApp(config as FirebaseOptions);
  const functions = getFunctions(app);
  const firestore = getFirestore(app);
  return new MapleGgFirebaseApi(functions, (collectionName) => new FirestoreApiHelper(firestore, collectionName));
};

export const mapleGgFirebaseApiAdmin = (firestore: FirestoreAdmin) => {
  return new MapleGgFirebaseApi(undefined, (collectionName) => new FirestoreAdminApiHelper(firestore, collectionName));
};

// For Calling Maple GG Api directly

export interface MapleGgCharacterData {
  // Basic Character Information
  CharacterImageURL: string
  Class: string
  Server: string

  // Character Stats
  Level: number
  LegionLevel: number

  // Ranking
  ClassRank: number
  GlobralRanking: number
  ServerRank: number
  ServerClassRanking: number
}

export interface MapleGgApiResponse {
  CharacterData: MapleGgCharacterData
}

export const fetchFromMapleGg = async (username: string) => {
  const response = await fetch(`https://api.maplestory.gg/v2/public/character/gms/${username}`);
  return await response.json() as MapleGgApiResponse;
};
