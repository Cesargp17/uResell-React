import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDnW-BgZmQJFXTYNgMZGppYK0gqdxuAtuA",
  authDomain: "uresell.firebaseapp.com",
  projectId: "uresell",
  storageBucket: "uresell.appspot.com",
  messagingSenderId: "209103958791",
  appId: "1:209103958791:web:318c2110f6e4ccc5414ba2"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);