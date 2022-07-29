import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBJ535cmbqACQNl-xhjIHe_UmrmbD7dijA",
    authDomain: "dayztrivia.firebaseapp.com",
    projectId: "dayztrivia",
    storageBucket: "dayztrivia.appspot.com",
    messagingSenderId: "787197190275",
    appId: "1:787197190275:web:0da8c1f2896bc8f81d7bb6"
  };

  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth(app);
  
  export const db = getFirestore(app);
  export default auth;

  