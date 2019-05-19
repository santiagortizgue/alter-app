import * as firebase from 'firebase/app';

// Required for side-effects
require("firebase/database");
require("firebase/storage");
require("firebase/auth");
require("firebase/firestore");

let config = {
    apiKey: "AIzaSyBxIWCPFYm71xO2AWF5adN7zh_aq8s-TAM",
    authDomain: "taller-app-a3390.firebaseapp.com",
    databaseURL: "https://taller-app-a3390.firebaseio.com",
    projectId: "taller-app-a3390",
    storageBucket: "taller-app-a3390.appspot.com",
    messagingSenderId: "445124244240"
  };
firebase.initializeApp(config);

export const db = firebase.firestore();
export const storage = firebase.storage();
export const auth =  firebase.auth();

export default db;