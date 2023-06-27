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
import {AccountCharacters, CharacterApi, MapleGgCachedData, characterApiAdmin, fetchFromMapleGg, mapleGgFirebaseApiAdmin} from "ms-tracker-library";

// Initialize the app
const app = admin.initializeApp(functions.config().firebase);
const firestore = app.firestore();
const characterApi = characterApiAdmin(firestore);
const mapleGgFirebaseApi = mapleGgFirebaseApiAdmin(firestore);

// Helper Function
const updateAccountCharacters = async (account: AccountCharacters) => {
  const characterNames = account.characters.map((char) => char.name);

  let now = new Date().getTime();
  const millisInADay = 1000 * 60 * 60 * 24;

  // find which ones are already stored in Firebase
  const cachedCharacters = await mapleGgFirebaseApi.search(characterNames);

  // only update characters that havent been retrieved or that havent been updated
  // in over a day
  const characterNamesToUpdate = characterNames.filter((name) => {
    const cachedCharacter = cachedCharacters.get(name.toLowerCase());
    const lastFetched = cachedCharacter?.lastRetrievedTimestamp;
    return (!lastFetched) || ((now - lastFetched) > millisInADay);
  });

  // Fetch the new characters from MapleGg
  now = new Date().getTime();
  const characters: MapleGgCachedData[] = await Promise.all(characterNamesToUpdate.map(async (name) => {
    try {
      const response = await fetchFromMapleGg(name);
      logger.debug(`api.maplestory.gg Fetched character ${name} in ${new Date().getTime() - now} ms`);

      const data = response.CharacterData;
      const formattedData: MapleGgCachedData = {
        name: data.Name,
        loweredName: data.Name.toLowerCase(),
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
      logger.error(`api.maplestory.gg Failed to fetch character ${name} e=${err}`);
      return {
        name,
        loweredName: name.toLowerCase(),
        lastRetrievedTimestamp: now,
      };
    }
  }));

  // Update the characters in Firebase
  logger.debug(`Updating ${characters.length} characters from api.maplestory.gg`);
  await Promise.all(characters.map(async (char) => {
    try {
      logger.debug(`Updating ${char.name} from api.maplestory.gg`);
      await mapleGgFirebaseApi.set(char);
    } catch (err) {
      logger.error(`Failed to update character ${JSON.stringify(char)} e=${err}`);
    }
    return;
  }));

  // Return success value
  return {
    success: true,
  };
};

// On Document Change Endpoint
export const updateAccountCharactersOnDocumentChange = functions.firestore.document(`${CharacterApi.CHARACTER_COLLECTION}/{docId}`).onUpdate((event, context) => {
  logger.log(`updateAccountCharacters from Document Update EVENT=${JSON.stringify(context.params.docId)}`);
  const data = event.after.data();
  try {
    const characters = AccountCharacters.parse(data);
    return updateAccountCharacters(characters);
  } catch (err) {
    logger.error(`updateAccountCharacters from Document Update failed data=${data}`);
    return {
      success: false,
    };
  }
});

// On Document Create Endpoint
export const updateAccountCharactersOnDocumentCreate = functions.firestore.document(`${CharacterApi.CHARACTER_COLLECTION}/{docId}`).onCreate((snapshot, context) => {
  logger.log(`updateAccountCharacters from Document Create EVENT=${JSON.stringify(context.params.docId)}`);
  const data = snapshot.data();
  try {
    const characters = AccountCharacters.parse(data);
    return updateAccountCharacters(characters);
  } catch (err) {
    logger.error(`updateAccountCharacters from Document Create failed data=${data}`);
    return {
      success: false,
    };
  }
});


// Http Call Endpoint
export const updateCharacterHttpCall = functions.https.onCall(async (data, context) => {
  logger.log(`updateAccountCharacters from HTTP endpoint AUTH=${JSON.stringify(context.auth)}`);

  const auth = context.auth;
  if (!auth || !(auth.uid)) {
    throw new functions.https.HttpsError("permission-denied", "Must be logged in");
  }

  // get the list of characters we might want to update
  const account: AccountCharacters = await characterApi.getUsingUid(auth.uid);

  // Trigger the update
  return await updateAccountCharacters(account);
});
