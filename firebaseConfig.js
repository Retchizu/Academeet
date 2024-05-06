import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrwRoAntd6Zd-ZLH1wdvS02mxcLd5avgI",
  authDomain: "academeet-2c576.firebaseapp.com",
  projectId: "academeet-2c576",
  storageBucket: "academeet-2c576.appspot.com",
  messagingSenderId: "1013386336021",
  appId: "1:1013386336021:web:5548487be8490a2ddf3b1c",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };
