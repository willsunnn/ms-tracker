/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import {AccountCharacters, CharacterApi, MapleGgCacheKey, MapleGgCachedData, cacheKeyToString, characterApiAdmin, fetchFromMapleGg, mapleGgFirebaseApiAdmin} from "ms-tracker-library";

// Initialize the app
const app = admin.initializeApp(functions.config().firebase);
const firestore = app.firestore();
const characterApi = characterApiAdmin(firestore);
const mapleGgFirebaseApi = mapleGgFirebaseApiAdmin(firestore);

const updateAndSave = async (key: MapleGgCacheKey): Promise<MapleGgCachedData> => {
  const char = await mapleGgFirebaseApi.getFromCache(key);

  // Don't refresh if we have a cached version less than a day old
  const lastFetched = char?.lastRetrievedTimestamp;
  const now = new Date().getTime();
  const millisInADay = 1000 * 60 * 60 * 24;
  if ((lastFetched !== undefined) && ((now - lastFetched) < millisInADay)) {
    logger.debug(`not updating ${char.name} as time diff is ${(now - lastFetched)} ms`);
    return char;
  }


  // Either we do not have a cached version or we need to update it
  let newData: MapleGgCachedData;
  try {
    const response = await fetchFromMapleGg(key.name, key.region);
    const data = response.CharacterData;
    logger.info(`api.maplestory.gg Fetched character ${char.name} in ${new Date().getTime() - now} ms`);
    logger.debug(`api.maplestory.gg Data for ${char.name} data=${data}`);

    const formattedData: MapleGgCachedData = {
      key: cacheKeyToString(key),
      region: key.region,
      loweredName: data.Name.toLowerCase(),
      lastRetrievedTimestamp: now,

      name: data.Name,
      image: data.CharacterImageURL,
      class: data.Class,
      classRank: data.ClassRank,
      level: data.Level,
      server: data.Server,
    };

    newData = formattedData;
  } catch (err) {
    // Error fetching the data probably
    // Lets log it, and then update the time so we dont keep making failed requests
    logger.error(`api.maplestory.gg Failed to fetch character ${char.name} e=${err}`);
    newData = {...char};
    newData.lastRetrievedTimestamp = now;
  }

  // Since we have an update (either fetched new data or lastRetrievedTimetsamp on failure)
  // Update the DB and return the value
  try {
    logger.debug(`Updating ${char.name} in cache from api.maplestory.gg`);
    await mapleGgFirebaseApi.set(newData);
  } catch (err) {
    logger.error(`Failed to update character ${JSON.stringify(char)} e=${err}`);
  }
  return newData;
};

// Helper Function
const updateAccountCharacters = async (account: AccountCharacters) => {
  const keys = account.characters.map((char) => ({name: char.name.toLowerCase(), region: char.region}));
  const characters = await Promise.all(keys.map(updateAndSave));
  return characters;
};

// On Document Change Endpoint
export const updateAccountCharactersOnDocumentChange = functions.firestore.document(`${CharacterApi.CHARACTER_COLLECTION}/{docId}`).onUpdate((event, context) => {
  logger.log(`updateAccountCharacters from Document Update EVENT=${JSON.stringify(context.params.docId)}`);
  const data = event.after.data();
  const characters = AccountCharacters.parse(data);
  return updateAccountCharacters(characters);
});

// On Document Create Endpoint
export const updateAccountCharactersOnDocumentCreate = functions.firestore.document(`${CharacterApi.CHARACTER_COLLECTION}/{docId}`).onCreate((snapshot, context) => {
  logger.log(`updateAccountCharacters from Document Create EVENT=${JSON.stringify(context.params.docId)}`);
  const data = snapshot.data();
  const characters = AccountCharacters.parse(data);
  return updateAccountCharacters(characters);
});

// Http Call Endpoint
export const updateCharacterHttpCall = functions.https.onCall(async (data, context) => {
  logger.log(`updateAccountCharacters from HTTP endpoint AUTH=${JSON.stringify(context.auth)}`);

  // Ensure signed in
  const auth = context.auth;
  if (!auth || !(auth.uid)) {
    throw new functions.https.HttpsError("permission-denied", "Must be logged in");
  }

  const account: AccountCharacters = await characterApi.getUsingUid(auth.uid);
  return await updateAccountCharacters(account);
});

// Http Call Individual character
export const getCharacterHttpCall = functions.https.onCall(async (data, context) => {
  logger.log(`getCharacterHttpCall from HTTP endpoint DATA=${JSON.stringify(data)} AUTH=${JSON.stringify(context.auth)}`);

  // Ensure signed in
  const auth = context.auth;
  if (!auth || !(auth.uid)) {
    throw new functions.https.HttpsError("permission-denied", "Must be logged in");
  }

  // Get Return the value
  return await updateAndSave(data);
});
