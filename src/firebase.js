import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAD2Zs5sYRzaVxAKK-LnNl2VG-3n1vjKwE",
    authDomain: "vooglue-dashboard.firebaseapp.com",
    projectId: "vooglue-dashboard",
    storageBucket: "vooglue-dashboard.firebasestorage.app",
    messagingSenderId: "488280221556",
    appId: "1:488280221556:web:ec22c8eefd3a2f8c946e21",
    measurementId: "G-3QF135QQY4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    // alert(err.message);
  }
};

const githubProvider = new GithubAuthProvider();
const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    console.log(user);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {   
  signOut(auth);
};

export { app, auth, db, signInWithGoogle, signInWithGithub, logout };
