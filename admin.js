import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const loginScreen =
    document.getElementById("loginScreen");

const dashboard =
    document.getElementById("dashboard");

const loginButton =
    document.getElementById("loginButton");

loginButton.addEventListener("click", login);

async function login() {

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (email === "" || password === "") {

        alert("Please enter your email and password.");

        return;

    }

    loginScreen.classList.add("hidden");

    dashboard.classList.remove("hidden");

    await loadDashboard();

}

async function loadDashboard() {

    const snapshot =
        await getDocs(collection(db, "families"));

    let familyCount = 0;

    let guestCount = 0;

    snapshot.forEach(doc => {

        familyCount++;

        const family = doc.data();

        if (Array.isArray(family.guests)) {

            guestCount += family.guests.length;

        }

    });

    document.getElementById("familyCount").textContent =
        familyCount;

    document.getElementById("guestCount").textContent =
        guestCount;

}