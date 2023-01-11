// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup ,signOut,signInWithRedirect,onAuthStateChanged} from "firebase/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXyb6j9IPOIwuZ3U1Jg9e9yJq3fwdl5ec",
  authDomain: "music-huddle.firebaseapp.com",
  projectId: "music-huddle",
  storageBucket: "music-huddle.appspot.com",
  messagingSenderId: "1076651857798",
  appId: "1:1076651857798:web:d7b64ba0e8fd82fcd4be07",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = getStorage(app);
const projectStorage = firebase.storage();
const projDB = firebase.firestore();
const timestamp = firebase.firestore.Timestamp;
const auth = getAuth(app);



export {app, storage, projectStorage, projDB, timestamp, auth };
export default getFirestore();
