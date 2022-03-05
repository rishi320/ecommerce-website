import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBCMSiAPLy22icVuIokQWrBmYL6Z4zo8TU",
    authDomain: "clone-70520.firebaseapp.com",
    projectId: "clone-70520",
    storageBucket: "clone-70520.appspot.com",
    messagingSenderId: "110289215377",
    appId: "1:110289215377:web:99a70e2c9ee0a55f538430",
    measurementId: "G-FKS5NZJRHY"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};