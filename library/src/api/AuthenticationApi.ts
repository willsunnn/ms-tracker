import {auth} from "../config";
import * as FirebaseAuth from "firebase/auth";

const onAuthStateChanged = (callback: (_:FirebaseAuth.User|null)=>void) => {
  const firebaseUnsubscribeCallback = auth.onAuthStateChanged(callback);
  return firebaseUnsubscribeCallback;
};

const signUp = async (email: string, password: string): Promise<FirebaseAuth.User> => {
  const userCredential = await FirebaseAuth.createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

const signIn = async (email: string, password: string): Promise<FirebaseAuth.User> => {
  const userCredential = await FirebaseAuth.signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

const forgotPassword = async (email: string) => {
  await FirebaseAuth.sendPasswordResetEmail(auth, email);
};

const signInWithGoogle = async () => {
  const provider = new FirebaseAuth.GoogleAuthProvider();
  const userCredential = await FirebaseAuth.signInWithPopup(auth, provider);
  return userCredential.user;
};

const signOut = async () => {
  await FirebaseAuth.signOut(auth);
};

export const AuthenticationApi = {
  onAuthStateChanged,
  signUp,
  signIn,
  forgotPassword,
  signInWithGoogle,
  signOut,
};
