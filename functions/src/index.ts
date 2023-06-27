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
import {AccountCharacters, MapleGgCachedData, characterApiAdmin, fetchFromMapleGg, mapleGgFirebaseApiAdmin} from "ms-tracker-library";
import {Firestore} from "firebase-admin/firestore";

const app = admin.initializeApp(functions.config().firebase);
const firestore: Firestore = app.firestore();

const characterApi = characterApiAdmin(firestore);
const mapleGgFirebaseApi = mapleGgFirebaseApiAdmin(firestore);

export const updateCharacter = functions.https.onCall(async (data, context) => {
  logger.log(`AUTH=${JSON.stringify(context.auth)}`);

  const auth = context.auth;
  if (!auth || !(auth.uid)) {
    throw new functions.https.HttpsError("permission-denied", "Must be logged in");
  }

  let now = new Date().getTime();
  const millisInADay = 1000 * 60 * 60 * 24;

  // get the list of characters we might want to update
  const account: AccountCharacters = await characterApi.getUsingUid(auth.uid);
  const characterNames = account.characters.map((char) => char.name);

  // find which ones are already stored in Firebase
  const cachedCharacters = await mapleGgFirebaseApi.search(characterNames);
  const cachedCharactersMap = new Map(cachedCharacters.map((char) => [char.name, char]));

  // only update characters that havent been retrieved or that havent been updated
  // in over a day
  const characterNamesToUpdate = characterNames.filter((name) => {
    const cachedCharacter = cachedCharactersMap.get(name);
    const lastFetched = cachedCharacter?.lastRetrievedTimestamp;
    return (!lastFetched) || ((now - lastFetched) > millisInADay);
  });

  // Fetch the new characters from MapleGg
  now = new Date().getTime();
  const characters: MapleGgCachedData[] = await Promise.all(characterNamesToUpdate.map(async (name) => {
    try {
      const response = await fetchFromMapleGg(name);
      logger.log(`api.maplestory.gg Fetched ${JSON.stringify(context.auth)} for character ${name} in ${new Date().getTime() - now} ms`);

      const data = response.CharacterData;
      const formattedData: MapleGgCachedData = {
        name,
        lastRetrievedTimestamp: now,
        image: data.CharacterImageURL,
        class: data.Class,
        classRank: data.ClassRank,
        level: data.Level,
        server: data.Server,
      };

      return formattedData;
    } catch (err) {
      // Error fetching the data probably
      // Lets log it, and then update the time so we dont keep making failed requests
      return {
        name,
        lastRetrievedTimestamp: now,
      };
    }
  }));

  // Update the characters in Firebase
  logger.log(`Updating ${characters.length} characters from api.maplestory.gg`);
  await Promise.all(characters.map(async (char) => {
    await mapleGgFirebaseApi.set(char);
    return;
  }));

  // Return success value
  return {
    success: true,
  };
});
