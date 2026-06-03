

console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
    alert("Lavender Bloom Portal Loaded Successfully!");
});



const eventName = "Music Night";
const eventDate = "2026-06-15";
let seats = 20;

console.log(
    `${eventName} on ${eventDate} has ${seats} seats available`
);



class EventItem {

    constructor(name, date, category, seats) {

        this.name = name;
        this.date = date;
        this.category = category;
        this.seats = seats;
    }
}

EventItem.prototype.checkAvailability = function () {

    return this.seats > 0;
};



const events = [

    new EventItem(
        "Music Night",
        "2026-06-15",
        "Music",
        20
    ),

    new EventItem(
        "Baking Workshop",
        "2026-06-18",
        "Workshop",
        10
    ),

    new EventItem(
        "Art Walk",
        "2026-06-20",
        "Art",
        0
    )
];



events.push(

    new EventItem(
        "Choir Evening",
        "2026-06-25",
        "Music",
        15
    )
);



const musicEvents = events.filter(
    event => event.category === "Music"
);

console.log("Music Events:");
console.log(musicEvents);


const formattedEvents = events.map(
    event => `Workshop on ${event.name}`
);

console.log(formattedEvents);



console.log("Object Entries:");

Object.entries(events[0]).forEach(
    ([key, value]) => {

        console.log(key, value);
    }
);


function registrationTracker() {

    let totalRegistrations = 0;

    return function () {

        totalRegistrations++;

        return totalRegistrations;
    };
}

const trackMusicRegistrations =
    registrationTracker();


function addEvent(eventObject) {

    events.push(eventObject);

    renderEvents();
}


function registerUser(eventObject) {

    try {

        if (eventObject.seats <= 0) {

            throw new Error(
                "Sorry! No seats available."
            );
        }

        eventObject.seats--;

        const total =
            trackMusicRegistrations();

        console.log(
            `Registered successfully. Total registrations: ${total}`
        );

        renderEvents();

    } catch (error) {

        alert(error.message);
    }
}


function filterEventsByCategory(
    category,
    callback = list => list
) {

    const clonedList = [...events];

    const filtered = clonedList.filter(

        event =>
            category === "All" ||
            event.category === category
    );

    return callback(filtered);
}




const eventsContainer =
    document.querySelector(
        "#eventsContainer"
    );

function renderEvents(
    eventList = events
) {

    eventsContainer.innerHTML = "";

    eventList.forEach(event => {

       

        if (
            event.seats <= 0
        ) {

            return;
        }

        const card =
            document.createElement("div");

        card.className = "eventCard";

        card.innerHTML = `

            <h3>${event.name}</h3>

            <p>
            Category:
            ${event.category}
            </p>

            <p>
            Date:
            ${event.date}
            </p>

            <p>
            Seats:
            ${event.seats}
            </p>

            <button class="register-btn">
                Register
            </button>
        `;

        const button =
            card.querySelector(
                ".register-btn"
            );

        button.onclick = () => {

            registerUser(event);
        };

        eventsContainer.appendChild(
            card
        );
    });
}


events.forEach(event => {

    console.log(
        `${event.name} loaded`
    );
});


const categoryFilter =
    document.querySelector(
        "#categoryFilter"
    );

categoryFilter.onchange = () => {

    const category =
        categoryFilter.value;

    const filtered =
        filterEventsByCategory(
            category
        );

    renderEvents(filtered);
};


document.addEventListener(
    "keydown",
    () => {

        const searchTerm =
            document
                .querySelector(
                    "#searchBox"
                )
                .value
                .toLowerCase();

        const filtered =
            events.filter(event =>

                event.name
                    .toLowerCase()
                    .includes(
                        searchTerm
                    )
            );

        renderEvents(filtered);
    }
);




function fetchEventsMock() {

    return new Promise(

        (resolve, reject) => {

            setTimeout(() => {

                resolve(events);

            }, 1000);
        }
    );
}




fetchEventsMock()

    .then(data => {

        console.log(
            "Promise Data:"
        );

        console.log(data);
    })

    .catch(error => {

        console.error(error);
    });




async function loadEvents() {

    try {

        const loading =
            document.querySelector(
                "#loading"
            );

        loading.style.display =
            "block";

        const data =
            await fetchEventsMock();

        loading.style.display =
            "none";

        renderEvents(data);

    } catch (error) {

        console.error(error);
    }
}

loadEvents();



function greetUser(
    username = "Guest"
) {

    return `Welcome ${username}`;
}

console.log(
    greetUser()
);


/* Destructuring */

const {

    name,
    date,
    category

} = events[0];

console.log(
    name,
    date,
    category
);


/* Spread Operator */

const clonedEvents =
    [...events];

console.log(
    clonedEvents
);


const form =
    document.querySelector(
        "#regForm"
    );

form.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        console.log(
            "Form submission started"
        );

        const {

            name,
            email,
            event: selectedEvent

        } = this.elements;

        const formMessage =
            document.querySelector(
                "#formMessage"
            );

        if (
            name.value.trim() === "" ||
            email.value.trim() === ""
        ) {

            formMessage.innerHTML =

                `<p class="error">
                    Please fill all fields.
                </p>`;

            return;
        }

        await sendRegistration({

            name:
                name.value,

            email:
                email.value,

            selectedEvent:
                selectedEvent.value
        });
    }
);



async function sendRegistration(
    userData
) {

    const formMessage =
        document.querySelector(
            "#formMessage"
        );

    formMessage.innerHTML =
        "Submitting...";

    try {

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    1500
                )
        );

        const response =
            await fetch(
                "https://jsonplaceholder.typicode.com/posts",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            userData
                        )
                }
            );

        console.log(
            "Payload Sent:",
            userData
        );

        if (!response.ok) {

            throw new Error(
                "Submission failed"
            );
        }

        formMessage.innerHTML =

            `<p class="success">
                Registration Successful!
            </p>`;

    } catch (error) {

        formMessage.innerHTML =

            `<p class="error">
                Registration Failed
            </p>`;

        console.error(error);
    }
}




console.log(
    "Debug: JS Loaded"
);

console.log(
    "Debug: Event Count =",
    events.length
);




$("#registerBtn").click(function () {

    $(".eventCard").fadeToggle();
});

console.log(
    "Framework Benefit: React/Vue provide reusable components and better state management."
);