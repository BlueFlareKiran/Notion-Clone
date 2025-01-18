import { initializeApp,getApps ,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDFjLTpishgxudGPtalbUTO9Kw9vYRJNo4",
    authDomain: "notion-clone-259c1.firebaseapp.com",
    projectId: "notion-clone-259c1",
    storageBucket: "notion-clone-259c1.firebasestorage.app",
    messagingSenderId: "895469567785",
    appId: "1:895469567785:web:1fe7ec001046ea6180c138"
  };
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(app);
  export{db};