import { db } from "./firebase.js";

const familyNameInput = document.getElementById("familyName");
const findInvitationButton = document.getElementById("findInvitation");
const rsvpContainer = document.getElementById("rsvpContainer");

findInvitationButton.addEventListener("click", () => {

    const familyName = familyNameInput.value.trim();

    if (familyName === "") {
        alert("Please enter your family name.");
        return;
    }

    searchFamily(familyName);

});

import {
    doc,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



const app = document.querySelector(".welcome-card");

async function searchFamily(familyName) {

    try {

        const familyRef = doc(
    db,
    "families",
    familyName.toLowerCase()
);

const familySnap = await getDoc(familyRef);

console.log("Searching document:", familyName.toLowerCase());

console.log("Exists?", familySnap.exists());

if (familySnap.exists()) {
    console.log(familySnap.data());
}

if (!familySnap.exists()) {

    alert("Invitation not found.");

    return;

}

const familyData = familySnap.data();

        console.log(familyData);

        showRSVPPage(familyData);

    } catch (error) {

        console.error(error);

    }

}

function showRSVPPage(familyData) {

    let guestHTML = "";

    familyData.guests.forEach((guest, index) => {

        guestHTML += `

        <div class="guest-card">

            <h2>

                ${guest.firstName} ${guest.lastName}

            </h2>

            <p>Will you be attending?</p>

            <label>

                <input
                    type="radio"
                    name="guest${index}"
                    value="yes">

                Joyfully Accepts

            </label>

            <br><br>

            <label>

                <input
                    type="radio"
                    name="guest${index}"
                    value="no">

                Regretfully Declines

            </label>

        </div>

        `;

    });

    app.innerHTML = `

        <h3 class="welcome-text">

            Welcome

        </h3>

        <h1 class="couple-names">

            ${familyData.familyName} Family

        </h1>

        <p class="intro-message">

            Please let us know who will be joining us.

        </p>

        ${guestHTML}

        <textarea
            id="message"
            placeholder="Leave us a message..."
            style="
                width:100%;
                height:140px;
                padding:15px;
                margin-top:25px;
                border-radius:14px;
                border:1px solid #ddd;
                resize:none;
            "
        ></textarea>

        <button
            id="submitRSVP"
            style="margin-top:25px;">

            Submit RSVP

        </button>

    `;

    document
        .getElementById("submitRSVP")
        .addEventListener(
            "click",
            showThankYouPage
        );

}

function showThankYouPage() {

    const attending =
    document.querySelectorAll('input[type="radio"][value="yes"]:checked').length > 0;

    if (attending) {

        app.innerHTML = `

            <h1 class="couple-names">

                Thank You!

            </h1>

            <p class="intro-message">

                We can't wait to celebrate with you!

            </p>

            <button id="venueButton">

                View Venue

            </button>

        `;

        document
            .getElementById("venueButton")
            .addEventListener("click", showVenuePage);

    } else {

        app.innerHTML = `

            <h1 class="couple-names">

                Thank You!

            </h1>

            <p class="intro-message">

                We're sorry you can't make it.

            </p>

        `;

    }

}

function showVenuePage() {

    app.innerHTML = `

        <h1 class="couple-names">

            Venue

        </h1>

        <p class="intro-message">

            Venue information goes here.

        </p>

    `;

}

async function loadWebsiteContent() {

    try {

        const websiteRef = doc(db, "website", "content");

        const websiteSnap = await getDoc(websiteRef);

        if (!websiteSnap.exists()) {

            console.log("Website content not found.");

            return;

        }

        const content = websiteSnap.data();

console.log(content);

alert(content.welcomeTitle);

        document.querySelector(".welcome-text").textContent =
            content.welcomeTitle;

        document.querySelector(".couple-names").textContent =
            content.coupleNames;

        document.querySelector(".intro-message").textContent =
            content.welcomeMessage;

        document.getElementById("findInvitation").textContent =
            content.buttonText;

    } catch (error) {

        console.error(error);

    }

}

loadWebsiteContent();