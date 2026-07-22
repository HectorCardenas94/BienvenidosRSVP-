const app = document.querySelector(".welcome-card");

const guestDatabase = {

    cardenas: [
        "Hector",
        "Jessica",
        "Mateo"
    ],

    rodriguez: [
        "Juan",
        "Maria",
        "Carlos"
    ],

    garcia: [
        "Luis",
        "Ana"
    ]

};

document
    .getElementById("findInvitation")
    .addEventListener("click", showRSVPPage);

function showRSVPPage() {

    const familyName =
        document
            .getElementById("familyName")
            .value
            .trim()
            .toLowerCase();

    if (familyName === "") {

        alert("Please enter your family name.");

        return;

    }

    if (!guestDatabase[familyName]) {

        alert("Invitation not found.");

        return;

    }

    let guestHTML = "";

    guestDatabase[familyName].forEach(person => {

        guestHTML += `

        <label style="display:block;text-align:left;margin-bottom:12px;">

            <input
                type="checkbox"
                class="guest">

            ${person}

        </label>

        `;

    });

    app.innerHTML = `

        <h3 class="welcome-text">

            Welcome

        </h3>

        <h1 class="couple-names">

            ${familyName.charAt(0).toUpperCase() + familyName.slice(1)}

        </h1>

        <p class="intro-message">

            Select everyone who will be attending.

        </p>

        ${guestHTML}

        <textarea
            id="message"
            placeholder="Leave us a message..."
            style="
                width:100%;
                height:140px;
                padding:15px;
                margin-top:20px;
                border-radius:14px;
                border:1px solid #ddd;
                resize:none;
            "
        ></textarea>

        <button
            id="submitRSVP"
            style="margin-top:20px;">

            Submit RSVP

        </button>

    `;

    document
        .getElementById("submitRSVP")
        .addEventListener("click", showThankYouPage);

}

function showThankYouPage() {

    const attending =
        document.querySelectorAll(".guest:checked").length > 0;

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