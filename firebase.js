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
import { getFirestore, doc, getDocs, collection, query, where } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

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
            document.getElementById('date').innerText = new Date(dateString).toDateString();
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

export { todayWinningNumber, searchWinningNumber, searchAgent };







