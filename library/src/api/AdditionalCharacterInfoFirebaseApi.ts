import {FirebaseOptions, initializeApp} from "firebase/app";
import {Unsubscribe, getFirestore} from "firebase/firestore";
import {Firestore as FirestoreAdmin} from "firebase-admin/firestore";
import {Functions, getFunctions, httpsCallable} from "firebase/functions";
import {CachedCharacter, CharacterData, CharacterCacheKey, ThirdPartyCharacterSearchResponse, Region, cacheKeyToString, MapleClass, defaultCachedCharacter} from "../models";
import {FirestoreApiHelper} from "./FirestoreApiHelper";
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

const determineClass = (jobId: number | undefined, jobDetail: number | undefined): MapleClass => {
  switch (jobId) {
  // Explorers
  case 1: {
    switch (jobDetail) {
    case 12:
      return "Hero";
    case 22:
      return "Paladin";
    case 32:
      return "Dark Knight";
    default:
      return "Unknown";
    }
  }
  case 2: {
    switch (jobDetail) {
    case 12:
      return "Fire/Poison Archmage";
    case 22:
      return "Ice/Lightning Archmage";
    case 32:
      return "Bishop";
    default:
      return "Unknown";
    }
  }
  case 3: {
    switch (jobDetail) {
    case 12:
      return "Bowmaster";
    case 22:
      return "Marksman";
    case 32:
      return "Pathfinder";
    default:
      return "Unknown";
    }
  }
  case 4: {
    switch (jobDetail) {
    case 12:
      return "Night Lord";
    case 22:
      return "Shadower";
    case 34:
      return "Blade Master";
    default:
      return "Unknown";
    }
  }
  case 5: {
    switch (jobDetail) {
    case 12:
      return "Buccaneer";
    case 22:
      return "Corsair";
    case 32:
      return "Cannon Master";
    default:
      return "Unknown";
    }
  }
  // Cygnus Knights
  case 11:
    return "Dawn Warrior";
  case 12:
    return "Blaze Wizard";
  case 13:
    return "Wind Archer";
  case 14:
    return "Night Walker";
  case 15:
    return "Thunder Breaker";
  case 202:
    return "Mihile";
  // Resistance
  case 31:
    return "Demon Slayer";
  case 32:
    return "Battle Mage";
  case 33:
    return "Wild Hunter";
  case 35:
    return "Mechanic";
  case 208:
    return "Xenon";
  case 209:
    return "Demon Avenger";
  case 215:
    return "Blaster";
  // Heroes
  case 21:
    return "Aran";
  case 22:
    return "Evan";
  case 23:
    return "Mercedes";
  case 24:
    return "Phantom";
  case 203:
    return "Luminous";
  case 212:
    return "Shade";
  // Nova
  case 204:
    return "Kaiser";
  case 205:
    return "Angelic Buster";
  case 216:
    return "Cadena";
  case 222:
    return "Kain";
  // Flora
  case 217:
    return "Illium";
  case 218:
    return "Ark";
  case 221:
    return "Adele";
  case 224:
    return "Khali";
  // Sengoku
  case 206:
    return "Hayato";
  case 207:
    return "Kanna";
  // Anima
  case 223:
    return "Lara";
  case 220:
    return "Hoyoung";
  // Others
  case 210:
    return "Zero";
  case 214:
    return "Kinesis";
  case 225:
    return "Lynn";
  case 226:
    return "Mo Xuan";
  case 227:
    return "Sia Astelle";
  default:
    return "Unknown";
  }
};

export const fetchAndTransform = async (username: string, region: Region): Promise<CharacterData> => {
  const searchReponse = await searchInfoFrom3rdParty(username, region);
  const character = searchReponse.ranks[0];
  return {
    name: character.characterName,
    region: region,
    characterImageURL: character.characterImgURL? character.characterImgURL : null,
    level: character.level ? character.level : null,
    class: determineClass(character.jobID, character.jobDetail),
  };
};
