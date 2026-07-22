import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    getDoc,
    updateDoc
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

    if (family.familyName === "") {

        alert("Please enter a family name.");

        return;

    }

    try {

        await setDoc(

            doc(
                db,
                "families",
                family.familyName.toLowerCase()
            ),

            family

        );

        alert("Family saved successfully!");

        showFamilyManager();

    }

    catch (error) {

        console.error(error);

        alert("Unable to save family.");

    }

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
    
    loadFamilies();

}

function showPage(title, html) {

    contentArea.innerHTML = `

        <h2>${title}</h2>

        <br>

        ${html}

    `;

}

function showPage(title, html) {

    contentArea.innerHTML = `

        <h2>${title}</h2>

        <br>

        ${html}

    `;

}

function showEditFamily(family = null) {

    contentArea.innerHTML = `

        <h2>Edit Family</h2>

        <br>

        <label>Family Name</label>

        <input
            id="editFamilyName"
            type="text"
            value="${family?.familyName || ""}">

        <br><br>

        <h3>Guests</h3>

        <div id="editGuestList">

        </div>

        <br>

        <button id="editAddGuestButton">

            + Add Guest

        </button>

        <br><br>

        <button id="updateFamilyButton">

            Save Changes

        </button>

    `;

    document
        .getElementById("editAddGuestButton")
        .addEventListener("click", addEditGuest);

}

function addEditGuest() {

    const guestList =
        document.getElementById("editGuestList");

    const input =
        document.createElement("input");

    input.type = "text";

    input.placeholder = "Guest Name";

    input.className = "guestName";

    input.style.marginTop = "10px";

    guestList.appendChild(input);

}

const responsesButton =
    document.getElementById("responsesButton");

responsesButton.addEventListener(
    "click",
    showResponses
);

function showResponses() {

    contentArea.innerHTML = `

        <h2>RSVP Responses</h2>

        <br>

        <table style="width:100%;border-collapse:collapse;">

            <thead>

                <tr>

                    <th>Family</th>
                    <th>Status</th>
                    <th>Guests</th>
                    <th>Message</th>

                </tr>

            </thead>

            <tbody id="responseTable">

                <tr>

                    <td colspan="4"
                        style="padding:25px;text-align:center;">

                        No responses yet.

                    </td>

                </tr>

            </tbody>

        </table>

    `;

}

const editWebsiteButton =
    document.getElementById("editWebsiteButton");

editWebsiteButton.addEventListener(
    "click",
    showWebsiteEditor
);

function showWebsiteEditor() {

    contentArea.innerHTML = `

        <h2>Website Settings</h2>

        <br>

        <label>Welcome Title</label>

        <input
            id="welcomeTitle"
            type="text">

        <br><br>

        <label>Couple Names</label>

        <input
            id="coupleNames"
            type="text">

        <br><br>

        <label>Welcome Message</label>

        <textarea
            id="welcomeMessage"
            rows="4"
            style="width:100%;padding:15px;border-radius:12px;"></textarea>

        <br><br>

        <label>Button Text</label>

        <input
            id="buttonText"
            type="text">

        <br><br>

        <button id="saveWebsiteButton">

            Save Website

        </button>

    `;

    document
        .getElementById("saveWebsiteButton")
        .addEventListener(
            "click",
            saveWebsiteSettings
        );

}

function saveWebsiteSettings() {

    alert("Website settings saved!");

}

function showVenueEditor() {

    contentArea.innerHTML = `

        <h2>Venue Information</h2>

        <br>

        <label>Venue Name</label>

        <input
            id="venueName"
            type="text">

        <br><br>

        <label>Venue Address</label>

        <input
            id="venueAddress"
            type="text">

        <br><br>

        <label>Google Maps Link</label>

        <input
            id="googleMapsLink"
            type="text">

        <br><br>

        <button id="saveVenueButton">

            Save Venue

        </button>

    `;

    document
        .getElementById("saveVenueButton")
        .addEventListener(
            "click",
            saveVenue
        );

}

function saveVenue() {

    alert("Venue saved!");

}

const venueButton =
    document.getElementById("venueButton");

venueButton.addEventListener(
    "click",
    showVenueEditor
);

async function loadFamilies() {

    const table =
        document.getElementById("familyTableBody");

    table.innerHTML = "";

    try {

        const snapshot =
            await getDocs(collection(db, "families"));

        if (snapshot.empty) {

            table.innerHTML = `

                <tr>

                    <td colspan="5"
                        style="text-align:center;padding:25px;">

                        No families found.

                    </td>

                </tr>

            `;

            return;

        }

        snapshot.forEach(doc => {

            const family = doc.data();

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${family.familyName}</td>

                <td style="text-align:center;">

                    ${family.guests.length}

                </td>

                <td style="text-align:center;">

                    ${
                        family.hasResponded
                            ? "Responded"
                            : "Pending"
                    }

                </td>

                <td style="text-align:center;">

                    <button
                        onclick="showEditFamily('${doc.id}')">

                        ✏️

                    </button>

                </td>

                <td style="text-align:center;">

                    <button
                        onclick="deleteFamily('${doc.id}')">

                        🗑️

                    </button>

                </td>

            `;

            table.appendChild(row);

        });

    }

    catch (error) {

        console.error(error);

    }

}

async function deleteFamily(id) {

    const confirmed = confirm(
        "Delete this family?"
    );

    if (!confirmed) {

        return;

    }

    try {

        await deleteDoc(
            doc(db, "families", id)
        );

        alert("Family deleted.");

        loadFamilies();

    }

    catch (error) {

        console.error(error);

        alert("Unable to delete family.");

    }

}
