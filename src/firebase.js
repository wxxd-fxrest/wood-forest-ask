
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCcsEsJerBDKqpdj65sPG7LLYe_OcIj-IE",
    authDomain: "ask-404-susses.firebaseapp.com",
    projectId: "ask-404-susses",
    storageBucket: "ask-404-susses.appspot.com",
    messagingSenderId: "843270065125",
    appId: "1:843270065125:web:4a885c245af6871222fd0c"
} ; 

firebase.initializeApp(firebaseConfig) ;
export const firebaseInstance = firebase ; 
export const authService = firebase.auth() ; 
export const dbService = firebase.firestore() ; 
export const storageService = firebase.storage();
