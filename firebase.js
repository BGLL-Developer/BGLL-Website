// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTMrLBvBniX58bDBQgWuUtuU-SAu1qIxs",
    authDomain: "bgll-update-portal-35881.firebaseapp.com",
    projectId: "bgll-update-portal-35881",
    storageBucket: "bgll-update-portal-35881.appspot.com",
    messagingSenderId: "830618333350",
    appId: "1:830618333350:web:7d6acbd0260d58c8f80467"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Import the necessary Firebase modules
import { getFirestore, doc, getDocs, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// --------------------------------------------------------------------------------------------
let countrer = 0;
function todayWinningNumber(dateString) {
    // Reference to your Firebase database
    const db = getFirestore(app);
    const boledoRef = collection(db, "Boledo");
    const q = query(boledoRef, where("date", "==", dateString), where('status', '==', 'active')); // Filter by date field

    getDocs(q).then((querySnapshot) => {
        const winningNumbers = querySnapshot.docs.map((doc) => doc.data());

        if (winningNumbers.length > 0) {
            const data = winningNumbers[0];

            const parsedDate = new Date(dateString)

            if (isNaN(parsedDate.getDate())) {
                document.getElementById('date').innerText = dateString;
            }
            else {
                document.getElementById('date').innerText = parsedDate.toDateString();
            }

            document.getElementById('winningNumber').innerText = data.winningNumber;
        } else {
            console.log("No data available for", dateString);
            // If no data for today, check yesterday
            todayWinningNumber(getYesterdayDateString());
        }
    }).catch((error) => {
        console.error(error);
    });
}

function getYesterdayDateString() {
    const today = new Date();
    today.setDate(today.getDate() - (++countrer));
    return today.toLocaleDateString();
}


// --------------------------------------------------------------------------------------------

function searchWinningNumber() {
    const game = document.getElementById('gameSelect').value;
    const selectedDate = document.getElementById('datePicker').value;


    if (selectedDate && game == "Boledo" || selectedDate && game == "Lottery") {

        // Parse the user-selected date (assuming YYYY-MM-DD format)
        const userDateParts = selectedDate.split('-');
        const userMonth = userDateParts[1].replace(/^0+/, '');; // Extract the month
        const userDay = userDateParts[2].replace(/^0+/, '');; // Extract the day
        const userYear = userDateParts[0]; // Extract the year
        // Format the date to mm/dd/yyyy for querying Firestore
        const formattedDate = `${userMonth}/${userDay}/${userYear}`;

        // Firestore connection logic
        const db = getFirestore(app);

        // Create a query based on game and date
        const winningsRef = collection(db, game);
        const q = query(winningsRef, where('date', '==', formattedDate), where('status', '==', 'active'));

        getDocs(q)
            .then(querySnapshot => {
                if (querySnapshot.empty) {
                    // Handle no results found
                    console.log("No winning numbers found for this game and date");
                    document.getElementById('gameWinningTitle').textContent = "No Results Found";
                    document.getElementById('winningNumber').textContent = "";
                } else {
                    const winningDoc = querySnapshot.docs[0].data();
                    document.getElementById('gameWinningTitle').textContent = game + " Winning Numbers";
                    document.getElementById('winningNumber').textContent = winningDoc.winningNumber; // Replace 'winningNumbers' with the actual field name in your firestore document
                }
            })
            .catch(error => {
                console.error("Error fetching winning numbers:", error);
            });
    }
    else if (selectedDate && game == "Jackpot") {
        // Parse the user-selected date (assuming YYYY-MM-DD format)
        const userDateParts = selectedDate.split('-');
        const userMonth = userDateParts[1].replace(/^0+/, '');; // Extract the month
        const userDay = userDateParts[2].replace(/^0+/, '');; // Extract the day
        const userYear = userDateParts[0]; // Extract the year
        // Format the date to mm/dd/yyyy for querying Firestore
        const formattedDate = `${userMonth}/${userDay}/${userYear}`;

        // Firestore connection logic
        const db = getFirestore(app);

        // Create a query based on game and date
        const winningsRef = collection(db, game);
        const q = query(winningsRef, where('date', '==', formattedDate), where('status', '==', 'active'));

        getDocs(q)
            .then(querySnapshot => {
                if (querySnapshot.empty) {
                    // Handle no results found
                    console.log("No winning numbers found for this game and date");
                    document.getElementById('gameWinningTitle').textContent = "No Results Found";
                    document.getElementById('winningNumber').textContent = "";
                } else {
                    const winningDoc = querySnapshot.docs[0].data();
                    document.getElementById('gameWinningTitle').textContent = game + " Winning Numbers";
                    document.getElementById('winningNumber').innerHTML = winningDoc.firstWinningNumber + "<br>" + winningDoc.secondWinningNumber + "<br>" + winningDoc.thirdWinningNumber;
                }
            })
            .catch(error => {
                console.error("Error fetching winning numbers:", error);
            });
    }

    else {
        document.getElementById('gameWinningTitle').textContent = "Select a Date";
        document.getElementById('winningNumber').textContent = "";
    }


}

function searchAgent(district) {
    const db = getFirestore(app);

    // Create a query based on game and date
    const winningsRef = collection(db, 'Agents');
    const q = query(winningsRef, where('district', '==', district), where('status', '==', 'active'));

    getDocs(q)
        .then(querySnapshot => {
            if (querySnapshot.empty) {
                console.log("No agents found");
                const agents = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                populateAgentsTable(agents);
            } else {
                // Convert querySnapshot to an array of agents
                const agents = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                populateAgentsTable(agents);
            }
        })
        .catch(error => {
            console.error("Error fetching agent info:", error);
        });
}

function populateAgentsTable(agents) {
    // Clear previous table content
    agentsTable.innerHTML = "";

    if (agents.length === 0) {
        // Handle no agents found
        const noResultsRow = `
        <tr>
          <td colspan="5" style="text-align: center;">No Agents Found</td>
        </tr>
      `;
        agentsTable.insertAdjacentHTML("beforeend", noResultsRow);
    } else {
        // Create table headers (assuming they don't change)
        const tableHeaders = `
        <thead>
          <tr>
            <th scope="col" style="text-align: left;">#</th>
            <th scope="col" style="text-align: left;">Business Name</th>
            <th scope="col" style="text-align: left;">Address</th>
            <th scope="col" style="text-align: left;">Community</th>
            <th scope="col" style="text-align: left;">District</th>
          </tr>
        </thead>
      `;
        agentsTable.insertAdjacentHTML("beforeend", tableHeaders);

        // Populate table body with agents
        const tableBody = document.createElement("tbody");
        agents.forEach((agent, index) => {
            const row = `
          <tr>
            <td style="text-align: left;">${index + 1}</td>
            <td style="text-align: left;">${agent.businessName}</td>
            <td style="text-align: left;">${agent.address}</td>
            <td style="text-align: left;">${agent.community}</td>
            <td style="text-align: left;">${agent.district}</td>
          </tr>
        `;
            tableBody.insertAdjacentHTML("beforeend", row);
        });
        agentsTable.appendChild(tableBody);
    }
}

function getMondayOfCurrentWeek() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Monday being the start of the week
    const monday = new Date(now.setDate(diff));
    return monday;
}

function getFridayOfCurrentWeek() {
    const monday = getMondayOfCurrentWeek();
    const friday = new Date(monday);
    friday.setDate(monday.getDate() + 4); // Friday is 4 days after Monday
    return friday;
}

function listenForChangesBoledo() {
    const db = getFirestore(app);
    const boledoRef = collection(db, "Boledo");
    const monday = getMondayOfCurrentWeek();
    const friday = getFridayOfCurrentWeek();

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const dayElements = {
        'Mon': 'boledoWinningNumberMon',
        'Tue': 'boledoWinningNumberTue',
        'Wed': 'boledoWinningNumberWed',
        'Thu': 'boledoWinningNumberThu',
        'Fri': 'boledoWinningNumberFri'
    };

    const stringMonday = monday.toLocaleDateString();
    const stringFriday = friday.toLocaleDateString();

    const q = query(boledoRef,
        where("date", ">=", stringMonday),
        where("date", "<=", stringFriday),
        where('status', '==', 'active'));

    getDocs(q).then((querySnapshot) => {
        const winningNumbers = querySnapshot.docs.map((doc) => doc.data());

        if (winningNumbers.length > 0) {
            daysOfWeek.forEach(day => {
                const dayElement = document.getElementById(dayElements[day]);
                dayElement.innerHTML = ''; // Clear previous numbers
            });

            winningNumbers.forEach(data => {
                const winningDate = new Date(data.date);
                const dayOfWeek = winningDate.toLocaleDateString('en-US', { weekday: 'short' });

                if (daysOfWeek.includes(dayOfWeek)) {
                    const dayElement = document.getElementById(dayElements[dayOfWeek]);
                    dayElement.innerText = `${data.winningNumber}`;
                }
            });
        } else {
            console.log("No data available for this week");
        }
    }).catch((error) => {
        console.error(error);
    });
}

function getSundayOfCurrentWeek() {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const diff = now.getDate() - dayOfWeek; // Calculate days since the last Sunday
    const sunday = new Date(now.setDate(diff));
    return sunday;
}

function listenForChangesJackpot() {
    const db = getFirestore(app);
    const jackpotRef = collection(db, "Jackpot");
    const sunday = getSundayOfCurrentWeek();

    const stringSunday = sunday.toLocaleDateString();

    console.log(stringSunday)

    const q = query(jackpotRef,
        where("date", "==", stringSunday),
        where('status', '==', 'active'));

    getDocs(q).then((querySnapshot) => {
        const winningNumbers = querySnapshot.docs.map((doc) => doc.data());

        if (winningNumbers.length > 0) {
            const jackpotFirstNumbersElement = document.getElementById('jackpotFirstWinningNumber');
            const jackpotSecondNumbersElement = document.getElementById('jackpotSecondWinningNumber');
            const jackpotThirdNumbersElement = document.getElementById('jackpotThirdWinningNumber');
            jackpotFirstNumbersElement.innerHTML = ''; // Clear previous numbers
            jackpotSecondNumbersElement.innerHTML = ''; // Clear previous numbers
            jackpotThirdNumbersElement.innerHTML = ''; // Clear previous numbers

            winningNumbers.forEach(data => {
                const lastTwoDigits = data.firstWinningNumber.slice(-2);
                const restOfNumber = data.firstWinningNumber.slice(0, -2);

                jackpotFirstNumbersElement.innerHTML = `${restOfNumber}<span class="underline">${lastTwoDigits}</span>`;

                jackpotSecondNumbersElement.innerText = `${data.secondWinningNumber}`;

                jackpotThirdNumbersElement.innerText = `${data.thirdWinningNumber}`;
            });
        } else {
            console.log("No data available for this Sunday");
        }
    }).catch((error) => {
        console.error(error);
    });
}



export { todayWinningNumber, searchWinningNumber, searchAgent, listenForChangesBoledo, listenForChangesJackpot };







