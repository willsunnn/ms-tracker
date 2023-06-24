/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from "firebase-functions";
// import * as admin from 'firebase-admin'
// import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {CharacterApi, AccountCharacters} from "ms-tracker-library";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const updateCharacter = functions.https.onCall(async (data, context) => {
  const auth = context.auth;
  if (!auth || !(auth.token.uid)) {
    throw new functions.https.HttpsError("permission-denied", "Must be logged in");
  }

  const account: AccountCharacters = await CharacterApi.getUsingUid(auth!.uid);

  logger.log(`found ${JSON.stringify(account)}`);

  // Return success value
  return {
    success: true,
  };
});
