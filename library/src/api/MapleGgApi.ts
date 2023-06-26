import {FirebaseOptions, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {Functions, getFunctions, httpsCallable} from "firebase/functions";
import {MapleGgCachedData} from "../models";
import {FirestoreApiHelper} from "./FirestoreApiHelper";
import {FirestoreApiHelperBase} from "./FirestoreApiHelperBase";

const MAPLE_GG_COLLECTION = "MapleGgCharacter";

export class MapleGgFirebaseApi {
  functions: Functions;
  api: FirestoreApiHelperBase;

  constructor(functions: Functions, api: (collectionName: string) => FirestoreApiHelperBase) {
    this.functions = functions;
    this.api = api(MAPLE_GG_COLLECTION);
  }

  public get = async (characterNames: string[]) => {
    this.api.search([{
      property: "name",
      op: "in",
      value: characterNames,
    }], MapleGgCachedData.parse);
  };

  public updateCharacter = async (uid: string) => {
    const func = httpsCallable(this.functions, "updateCharacter");
    return await func({});
  };
}

export const mapleGgFirebaseApi = (config: FirebaseOptions) => {
  const app = initializeApp(config as FirebaseOptions);
  const functions = getFunctions(app);
  const firestore = getFirestore(app);
  return new MapleGgFirebaseApi(functions, (collectionName) => new FirestoreApiHelper(firestore, collectionName));
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
