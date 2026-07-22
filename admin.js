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

const contentArea = document.getElementById("contentArea");

const addFamilyButton = document.getElementById("addFamilyButton");

addFamilyButton.addEventListener("click", showAddFamilyForm);

function showAddFamilyForm() {

    contentArea.innerHTML = `

        <h2>Add New Family</h2>

        <br>

        <label>Family Name</label>

        <input
            type="text"
            id="familyName"
            placeholder="Ex: Cardenas">

        <br><br>

        <h3>Guests</h3>

        <div id="guestList">

            <input
                type="text"
                class="guestName"
                placeholder="Guest Name">

        </div>

        <br>

        <button id="addGuestButton">

            + Add Another Guest

        </button>

        <br><br>

        <button id="saveFamilyButton">

            Save Family

        </button>

    `;

    document
        .getElementById("addGuestButton")
        .addEventListener("click", addGuestField);
document
    .getElementById("saveFamilyButton")
    .addEventListener("click", saveFamily);
}

function addGuestField() {

    const guestList =
        document.getElementById("guestList");

    const input =
        document.createElement("input");

    input.type = "text";

    input.className = "guestName";

    input.placeholder = "Guest Name";

    input.style.marginTop = "10px";

    guestList.appendChild(input);

}

function getFamilyData() {

    const familyName =
        document.getElementById("familyName").value.trim();

    const guestInputs =
        document.querySelectorAll(".guestName");

    const guests = [];

    guestInputs.forEach(input => {

        const name = input.value.trim();

        if (name !== "") {

            guests.push({
                name: name,
                attending: null
            });

        }

    });

    return {

        familyName: familyName,

        guests: guests,

        hasResponded: false,

        message: ""

    };

}

async function saveFamily() {

    const family = getFamilyData();

    console.log(family);

    alert("Family is ready to save!");

}

const familyManagerButton =
    document.getElementById("familyManagerButton");

familyManagerButton.addEventListener(
    "click",
    showFamilyManager
);

function showFamilyManager() {

    contentArea.innerHTML = `

        <h2>Family Manager</h2>

        <br>

        <table style="width:100%; border-collapse:collapse;">

            <thead>

                <tr>

                    <th style="text-align:left;">Family</th>

                    <th>Guests</th>

                    <th>Status</th>

                    <th>Actions</th>

                </tr>

            </thead>

            <tbody id="familyTableBody">

                <tr>

                    <td colspan="4" style="padding:20px; text-align:center;">

                        No families loaded yet.

                    </td>

                </tr>

            </tbody>

        </table>

    `;

}
