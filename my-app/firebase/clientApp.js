import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const clientCredentials = {
    api: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectid: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKETddagen,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
};

if (!firebase.getApps.length)
    firebase.initializeApp(clientCredentials);

export default firebase;

