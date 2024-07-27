import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore, collection, addDoc, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, deleteUser
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
    getDatabase
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCbNrwP0OEpLE4feI1_kdXdjdNWIZXKPdM",
    authDomain: "automation-project-d3b55.firebaseapp.com",
    projectId: "automation-project-d3b55",
    storageBucket: "automation-project-d3b55.appspot.com",
    messagingSenderId: "942398317055",
    appId: "1:942398317055:web:15296ad0951b37e00347ca",
    measurementId: "G-YFV8XHZ298"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

export {
    app, db, auth, getDoc, deleteDoc, signOut, database,
    createUserWithEmailAndPassword, signInWithEmailAndPassword, collection,
    addDoc, getDocs, setDoc, doc, updateDoc, onAuthStateChanged, getAuth, deleteUser
};
