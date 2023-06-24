import {FirebaseOptions, initializeApp} from "firebase/app";
import {Auth, getAuth} from "firebase/auth";
import * as FirebaseAuth from "firebase/auth";

export class AuthenticationApi {
  auth: Auth;

  constructor(config: FirebaseOptions) {
    const app = initializeApp(config);
    this.auth = getAuth(app);
  }

  public onAuthStateChanged = (callback: (_:FirebaseAuth.User|null)=>void) => {
    const firebaseUnsubscribeCallback = this.auth.onAuthStateChanged(callback);
    return firebaseUnsubscribeCallback;
  };

  public signUp = async (email: string, password: string): Promise<FirebaseAuth.User> => {
    const userCredential = await FirebaseAuth.createUserWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  };

  public signIn = async (email: string, password: string): Promise<FirebaseAuth.User> => {
    const userCredential = await FirebaseAuth.signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  };

  public forgotPassword = async (email: string) => {
    await FirebaseAuth.sendPasswordResetEmail(this.auth, email);
  };

  public signInWithGoogle = async () => {
    const provider = new FirebaseAuth.GoogleAuthProvider();
    const userCredential = await FirebaseAuth.signInWithPopup(this.auth, provider);
    return userCredential.user;
  };

  public signOut = async () => {
    await FirebaseAuth.signOut(this.auth);
  };
}
