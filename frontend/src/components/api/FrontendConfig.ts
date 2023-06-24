import {type FirebaseOptions} from "firebase/app";
import config from "./frontend.config.json";
import {CharacterApi, TaskStatusApi, AuthenticationApi, MapleGgFirebaseApi} from "ms-tracker-library";

const frontendConfig: FirebaseOptions = config;
export const characterApi: CharacterApi = new CharacterApi(frontendConfig);
export const taskStatusApi: TaskStatusApi = new TaskStatusApi(frontendConfig);
export const authenticationApi: AuthenticationApi = new AuthenticationApi(frontendConfig);
export const mapleGgFirebaseApi: MapleGgFirebaseApi = new MapleGgFirebaseApi(frontendConfig);
