import {FirebaseOptions, initializeApp} from "firebase/app";
import {Unsubscribe, getFirestore} from "firebase/firestore";
import {Firestore as FirestoreAdmin} from "firebase-admin/firestore";
import {Functions, getFunctions, httpsCallable} from "firebase/functions";
import {FirestoreApiHelper} from "./FirestoreApiHelper";
import {CachedCharacter, CharacterData, CharacterCacheKey, ThirdPartyCharacterSearchResponse, Region, cacheKeyToString, defaultCachedCharacter} from "../models";
import {FirestoreApiHelperBase, QueryParam} from "./FirestoreApiHelperBase";
import {FirestoreAdminApiHelper} from "./FirestoreAdminApiHelper";

export class AdditionalCharacterInfoFirebaseApi {
  public static readonly ADDITIONAL_CHARACTER_INFO_COLLECTION = "AdditionalCharacterInfo";

  functions: Functions | undefined;
  api: FirestoreApiHelperBase;

  constructor(functions: Functions | undefined, api: (collectionName: string) => FirestoreApiHelperBase) {
    this.functions = functions;
    this.api = api(AdditionalCharacterInfoFirebaseApi.ADDITIONAL_CHARACTER_INFO_COLLECTION);
  }

  private resultToMap = (results: CachedCharacter[]) => {
    return new Map(results.map((char) => [char.key, char]));
  };

  private searchQuery = (characters: CharacterCacheKey[]) => {
    const keys = characters.map(cacheKeyToString);
    const params: QueryParam[] = [{
      property: "key",
      op: "in",
      value: keys,
    }];
    return params;
  };

  public getFromCache = async (char: CharacterCacheKey): Promise<CachedCharacter> => {
    const key = cacheKeyToString(char);
    return await this.api.getOrDefault(key, () => defaultCachedCharacter(char), CachedCharacter.parse);
  };

  public search = async (characters: CharacterCacheKey[]): Promise<Map<string, CachedCharacter>> => {
    // firebase throws an error if in clause has 0 entries
    if (characters.length == 0) {
      return new Map<string, CachedCharacter>();
    }

    const results = await this.api.search(
      "",
      this.searchQuery(characters),
      CachedCharacter.parse
    );
    return this.resultToMap(results);
  };

  public searchAndListen = (characters: CharacterCacheKey[], handler: (_: Map<string, CachedCharacter>)=>void, errHandler: (_:unknown)=>void): Unsubscribe => {
    // firebase throws an error if in clause has 0 entries
    if (characters.length == 0) {
      handler(new Map<string, CachedCharacter>());
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
      CachedCharacter.parse
    );
  };

  public set = async (character: CachedCharacter) => {
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
      throw new Error("AdditionalCharacterInfoFirebaseApi.functions is undefined");
    }
  };

  public get = async (name: string, region: Region) => {
    if (this.functions) {
      const func = httpsCallable(this.functions, "getCharacterHttpCall");
      const result = await func({name, region});
      const data = CachedCharacter.parse(result.data);
      return data;
    } else {
      throw new Error("AdditionalCharacterInfoFirebaseApi.functions is undefined");
    }
  };
}

export const additionalCharacterInfoFirebaseApi = (config: FirebaseOptions) => {
  const app = initializeApp(config as FirebaseOptions);
  const functions = getFunctions(app);
  const firestore = getFirestore(app);
  return new AdditionalCharacterInfoFirebaseApi(functions, (collectionName) => new FirestoreApiHelper(firestore, collectionName));
};

export const additionalCharacterInfoFirebaseApiAdmin = (firestore: FirestoreAdmin) => {
  return new AdditionalCharacterInfoFirebaseApi(undefined, (collectionName) => new FirestoreAdminApiHelper(firestore, collectionName));
};

export const searchInfoFrom3rdParty = async (username: string, region: Region): Promise<ThirdPartyCharacterSearchResponse> => {
  const url = `https://www.nexon.com/api/maplestory/no-auth/ranking/v2/${region}?type=overall&id=legendary&reboot_index=0&page_index=1&character_name=${username}`;
  const response = await fetch(url);
  const responseJson = await response.json();
  return ThirdPartyCharacterSearchResponse.parse(responseJson);
};

export const fetchAndTransform = async (username: string, region: Region): Promise<CharacterData> => {
  const searchReponse = await searchInfoFrom3rdParty(username, region);
  const character = searchReponse.ranks[0];
  return {
    name: character.characterName,
    region: region,
    characterImageURL: character.characterImgURL? character.characterImgURL : null,
    level: character.level ? character.level : null,
    class: character.jobName,
  };
};
