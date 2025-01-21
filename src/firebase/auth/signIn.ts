import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseAppConfig from "../firebaseAppConfig";

const auth = getAuth(firebaseAppConfig);

export default async function signIn(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}
