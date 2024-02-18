import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: 'AIzaSyBsTnrILm9nU85GzvMzsgufaHrtCmwI0LY',
  authDomain: 'hackfax-e62a7.firebaseapp.com',
  projectId: 'hackfax-e62a7',
  storageBucket: 'hackfax-e62a7.appspot.com',
  messagingSenderId: '602914139092',
  appId: '1:602914139092:web:ed777eb986f3cccbf5c441',
};

// Initialize Firebase
let app: any;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
// db
const db = getFirestore(app);
export { app, db };
