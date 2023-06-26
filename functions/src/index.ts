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
import {AccountCharacters, Character, MapleGgCachedData, characterApiAdmin, fetchFromMapleGg} from "ms-tracker-library";
import {Firestore} from "firebase-admin/firestore";

const app = admin.initializeApp(functions.config().firebase);
const firestore: Firestore = app.firestore();

export const updateCharacter = functions.https.onCall(async (data, context) => {
  logger.log(`AUTH=${JSON.stringify(context.auth)}`);

  const auth = context.auth;
  if (!auth || !(auth.uid)) {
    throw new functions.https.HttpsError("permission-denied", "Must be logged in");
  }

  const characterApi = characterApiAdmin(firestore);
  const account: AccountCharacters = await characterApi.getUsingUid(auth.uid);

  const now = new Date();
  const millisInADay = 1000 * 60 * 60 * 24;

  let characterUpdated = false;
  const characters: Character[] = await Promise.all(account.characters.map(async (character) => {
    try {
      const lastFetched = character.mapleGgLastUpdated;

      // if we fetched it more than a day ago, don't hit the API
      if (lastFetched && (now.getTime() - lastFetched < millisInADay)) {
        return character;
      }

      const reponse = await fetchFromMapleGg(character.name);
      logger.log(`api.maplestory.gg Fetched ${JSON.stringify(context.auth)} for character ${character.name} in ${new Date().getTime() - now.getTime()} ms`);

      const data = reponse.CharacterData;
      const formattedData: MapleGgCachedData = {
        image: data.CharacterImageURL,
        class: data.Class,
        classRank: data.ClassRank,
        level: data.Level,
        server: data.Server,
      };

      character.mapleGgData = formattedData;
      character.mapleGgLastUpdated = now.getTime();
      characterUpdated = true;
      return character;
    } catch (err) {
      // Error fetching the data probably
      // Lets log it, and then update the time so we dont keep making failed requests
      character.mapleGgLastUpdated = now.getTime();
      characterUpdated = true;
      return character;
    }
  }));

  if (characterUpdated) {
    logger.log(`Updating characters for uid ${auth.uid}`);
    account.characters = characters;
    await characterApi.setUsingUid(auth.uid, account);
  } else {
    logger.log(`Not updating characters for uid ${auth.uid} as no change was made`);
  }

  // Return success value
  return {
    success: true,
  };
});
