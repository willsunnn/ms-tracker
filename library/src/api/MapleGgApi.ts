import {FirebaseOptions, initializeApp} from "firebase/app";
import {Unsubscribe, getFirestore} from "firebase/firestore";
import {Firestore as FirestoreAdmin} from "firebase-admin/firestore";
import {Functions, getFunctions, httpsCallable} from "firebase/functions";
import {MapleGgCacheKey, MapleGgCachedData, Region, cacheKeyToString, defaultMapleGgCachedData} from "../models";
import {FirestoreApiHelper} from "./FirestoreApiHelper";
import {FirestoreApiHelperBase, QueryParam} from "./FirestoreApiHelperBase";
import {FirestoreAdminApiHelper} from "./FirestoreAdminApiHelper";

export class MapleGgFirebaseApi {
  public static readonly MAPLE_GG_COLLECTION = "MapleGgCharacter";

  functions: Functions | undefined;
  api: FirestoreApiHelperBase;

  constructor(functions: Functions | undefined, api: (collectionName: string) => FirestoreApiHelperBase) {
    this.functions = functions;
    this.api = api(MapleGgFirebaseApi.MAPLE_GG_COLLECTION);
  }

  private resultToMap = (results: MapleGgCachedData[]) => {
    return new Map(results.map((char) => [char.key, char]));
  };

  private searchQuery = (characters: MapleGgCacheKey[]) => {
    const keys = characters.map(cacheKeyToString);
    const params: QueryParam[] = [{
      property: "key",
      op: "in",
      value: keys,
    }];
    return params;
  };

  public getFromCache = async (char: MapleGgCacheKey) => {
    const key = cacheKeyToString(char);
    return await this.api.getOrDefault(key, () => defaultMapleGgCachedData(char), MapleGgCachedData.parse);
  };

  public search = async (characters: MapleGgCacheKey[]) => {
    // firebase throws an error if in clause has 0 entries
    if (characters.length == 0) {
      return new Map<string, MapleGgCachedData>();
    }

    const results = await this.api.search(
      "",
      this.searchQuery(characters),
      MapleGgCachedData.parse
    );
    return this.resultToMap(results);
  };

  public searchAndListen = (characters: MapleGgCacheKey[], handler: (_: Map<string, MapleGgCachedData>)=>void, errHandler: (_:unknown)=>void): Unsubscribe => {
    // firebase throws an error if in clause has 0 entries
    if (characters.length == 0) {
      handler(new Map<string, MapleGgCachedData>());
      return ()=>{};
    }

    return this.api.searchAndListen(
      "",
      this.searchQuery(characters),
      (data) => {
        const map = this.resultToMap(data);
        handler(map);
      },
      errHandler,
      MapleGgCachedData.parse
    );
  };

  public set = async (character: MapleGgCachedData) => {
    if (character.name !== undefined) {
      character.loweredName = character.name.toLowerCase();
    }
    character.key = cacheKeyToString({region: character.region, name: character.loweredName});
    return this.api.set(character.key, character);
  };

  public updateCharacter = async () => {
    if (this.functions) {
      const func = httpsCallable(this.functions, "updateCharacterHttpCall");
      return await func({});
    } else {
      throw new Error("MapleGgFirebaseApi.functions is undefined");
    }
  };

  public get = async (name: string, region: Region) => {
    if (this.functions) {
      const func = httpsCallable(this.functions, "getCharacterHttpCall");
      const result = await func({name, region});
      const data = MapleGgCachedData.parse(result.data);
      return data;
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
  Name: string

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

export const fetchFromMapleGg = async (username: string, region: Region) => {
  const response = await fetch(`https://api.maplestory.gg/v2/public/character/${region}/${username}`);
  return await response.json() as MapleGgApiResponse;
};
