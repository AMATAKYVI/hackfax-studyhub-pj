import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  projectId: process.env.FIREBASE_PROJECTID,
  storageBucket: 'hackfax-e62a7.appspot.com',
  messagingSenderId: '602914139092',
  appId: '1:602914139092:web:ed777eb986f3cccbf5c441',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// db
export const db = getFirestore(app);
