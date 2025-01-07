import { auth } from "./firebaseConfig.ts";

import {
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

function guestLogIn() {
  return signInAnonymously(auth)
    .then(() => {
      console.log("Guest log in");
      // Signed in..
    })
    .catch((error: any) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      // ...
    });
}

function googleLogIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        console.log(`Google sign in with token ${token}`);
      } else {
        throw new Error("Credential is null");
      }
    })
    .catch((error) => {
      console.warn("Google sign in failed", error);
    });
}

function logOut() {
  return signOut(auth)
    .then(() => {
      console.log("Signed out");
    })
    .catch((error: any) => {
      console.log(error);
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(`User signed in with id ${user.uid}`);
  } else {
    console.log("User signed out");
  }
});

export { guestLogIn, logOut, googleLogIn };
