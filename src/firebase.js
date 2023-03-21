// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// front back للربط
import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ,
    projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID ,
    storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
   };
    

   const app = initializeApp(firebaseConfig)
   //app المشروع ال شغال بيه
   const auth = getAuth(app);
   const db = getFirestore(app);

   export {auth , db}