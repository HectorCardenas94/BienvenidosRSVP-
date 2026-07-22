// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Firebase Configuration

const firebaseConfig = {

    apiKey: "AIzaSyBMzUzEoK_Dir_7TLoTy9m9n6zeIN5bOk4",

    authDomain: "bienvenidos-b34c1.firebaseapp.com",

    projectId: "bienvenidos-b34c1",

    storageBucket: "bienvenidos-b34c1.firebasestorage.app",

    messagingSenderId: "35180538656",

    appId: "1:35180538656:web:3668b45a9cc20f5d748545"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

// Export for other files

export { db, auth };