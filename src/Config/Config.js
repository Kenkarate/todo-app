import { initializeApp } from "firebase/app";
import {  addDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { LoginContext } from "../Components/context/UserContext";


const firebaseConfig = {
  apiKey: "AIzaSyAf___3vzI1qmgf2wmOxmKsgECV0i7j2Fs",
  authDomain: "growth-todo.firebaseapp.com",
  projectId: "growth-todo",
  storageBucket: "growth-todo.appspot.com",
  messagingSenderId: "269941203378",
  appId: "1:269941203378:web:fb0bddbd3872d0189344ab"
};
// initialise firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore();


export default {db, app};