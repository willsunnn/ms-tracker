import {FirebaseOptions, initializeApp} from "firebase/app";
import {Functions, getFunctions, httpsCallable} from "firebase/functions";

export class MapleGgFirebaseApi {
  functions: Functions;

  constructor(config: FirebaseOptions) {
    const app = initializeApp(config);
    const functions = getFunctions(app);
    this.functions = functions;
  }

  public get = async (uid: string) => {
    const func = httpsCallable(this.functions, "updateCharacter");
    return await func({});
  };
}

export const getFromMapleGg = async (username: string) => {
  // const response = await fetch(`https://api.maplestory.gg/v2/public/character/gms/${username}`)
  // return await response.json()
  return {};

  // const mapleGgData = MapleGgApi.get('nùms').then((data) => {
  //     console.log(data);
  // }).catch((err) => {
  //     alert(err);
  // });
};
