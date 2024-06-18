import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyC2leLNiRwlm1a6Gqc6rp-yTy2fJDjL_Q8",
  authDomain: "tugas-5847a.firebaseapp.com",
  projectId: "tugas-5847a",
  storageBucket: "tugas-5847a.appspot.com",
  messagingSenderId: "1094080058486",
  appId: "1:1094080058486:web:0b2d924325695a787abb57"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
export { db };
