// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// Import Firebase Performance Monitoring SDK
import { Timestamp, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
// Import the AppCheck module and the ReCaptcha provider
import * as appCheck from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-check.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGMnBQeYawhO5UKz5zTX2-IL77ePBiDW0",
  authDomain: "bgll-update-portal-35881.firebaseapp.com",
  projectId: "bgll-update-portal-35881",
  storageBucket: "bgll-update-portal-35881",
  messagingSenderId: "830618333350",
  appId: "1:830618333350:web:7d6acbd0260d58c8f80467",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize AppCheck with reCAPTCHA v3
const appCheckInstance = appCheck.initializeAppCheck(app, {
  provider: new appCheck.ReCaptchaV3Provider("6Le1a5MqAAAAAOOGH-qEa-_5L2B2sJQjWKFp4P9i"), // Replace with your reCAPTCHA v3 site key
  isTokenAutoRefreshEnabled: true, // Optional: Enables auto-refresh of AppCheck tokens
});


// Use the AppCheck.getToken() method to retrieve a token
appCheck.getToken(appCheckInstance).then((token) => {
  // Proceed with Firestore operations (read/write)
  const db = getFirestore(app);
  // Your Firestore code here
}).catch((error) => {
  console.error('App Check Token Error:', error);
});



// Import the necessary Firebase modules
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


// --------------------------------------------------------------------------------------------

function listenForChangesBoledo() {
  const db = getFirestore(app);

  // Helper function to get the Monday of the current week
  function getMondayOfCurrentWeek() {
    const today = new Date();
    const day = today.getDay();
    const diff = day === 0 ? -6 : 1 - day; // Adjust for Sunday (0) or other days
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0); // Start of the day
    return monday;
  }

  const monday = getMondayOfCurrentWeek();
  const friday = new Date(monday);
  friday.setDate(monday.getDate() + 4); // Friday of the same week
  friday.setHours(23, 59, 59, 999); // Sets to 11:59:59.999 PM

  // Convert dates to Firestore Timestamps
  const startOfWeek = Timestamp.fromDate(monday);
  const endOfWeek = Timestamp.fromDate(friday);

  const dayElements = {
    Mon: "boledoWinningNumberMon",
    Tue: "boledoWinningNumberTue",
    Wed: "boledoWinningNumberWed",
    Thu: "boledoWinningNumberThu",
    Fri: "boledoWinningNumberFri",
  };

  // Check if today is Sunday
  const today = new Date();
  if (today.getDay() === 0) {
    console.log("Today is Sunday, not displaying Boledo numbers.");
    Object.values(dayElements).forEach((id) => {
      document.getElementById(id).innerHTML = "";
    });
    return;
  }

  // Query Firestore for documents between Monday and Friday
  const boledoQuery = query(
    collection(db, "Boledo"),
    where("date", ">=", startOfWeek),
    where("date", "<=", endOfWeek),
    where("status", "==", "active")
  );

  getDocs(boledoQuery)
    .then((querySnapshot) => {
      // Map the results to a keyed object for easy lookup by day
      const results = {};
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const docDate = data.date.toDate();
        const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][docDate.getDay()];
        results[dayName] = data.winningNumber;
      });

      // Update the UI
      Object.entries(dayElements).forEach(([day, elementId]) => {
        const dayElement = document.getElementById(elementId);
        dayElement.innerHTML = ""; // Clear previous numbers
        if (results[day]) {
          dayElement.innerText = results[day];
        } else {
          console.log(`No Boledo data available for ${day}`);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching Boledo data:", error);
    });
}

function listenForChangesJackpot() {
  const db = getFirestore(app);

  // Helper function to check if today is Sunday
  function isTodaySunday() {
    const today = new Date();
    return today.getDay() === 0; // 0 represents Sunday
  }

  const ref = collection(db, "Jackpot");

  if (isTodaySunday()) {
    // Get today's date range (12:00 AM to 11:50 PM)
    const today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0); // 12:00 AM
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999); // 11:59 PM

    // Firestore query to get documents between the range
    const q = query(
      ref,
      where("status", "==", "active"),
      where("date", ">=", startOfDay),
      where("date", "<=", endOfDay),
      orderBy("date", "des"), // Order by date in ascending order
      limit(1) // Limit to the most recent result
    );

    getDocs(q)
      .then((querySnapshot) => {
        processJackpotData(querySnapshot);
      })
      .catch((error) => {
        console.error("Error fetching Jackpot data for Sunday:", error);
      });
  } else {
    // Query for the most recent document (non-Sundays)
    const q = query(
      ref,
      where("status", "==", "active"),
      orderBy("date", "desc"), // Order by date in descending order
      limit(1) // Limit to the most recent result
    );

    getDocs(q)
      .then((querySnapshot) => {
        processJackpotData(querySnapshot);
      })
      .catch((error) => {
        console.error("Error fetching Jackpot data:", error);
      });
  }

  // Helper function to process Jackpot data
  function processJackpotData(querySnapshot) {
    const jackpotFirstNumbersElement = document.getElementById("jackpotFirstWinningNumber");
    const jackpotSecondNumbersElement = document.getElementById("jackpotSecondWinningNumber");
    const jackpotThirdNumbersElement = document.getElementById("jackpotThirdWinningNumber");

    // Clear UI elements by default
    jackpotFirstNumbersElement.innerHTML = "";
    jackpotSecondNumbersElement.innerHTML = "";
    jackpotThirdNumbersElement.innerHTML = "";

    if (querySnapshot.empty) {
      console.log("No active Jackpot data available.");
      if (isTodaySunday()) {
        console.log("Today is Sunday. No new data available, clearing display.");
      }
      return;
    }

    // Process the most recent document
    const data = querySnapshot.docs[0].data();
    const lastTwoDigits = data.firstWinningNumber.slice(-2);
    const restOfNumber = data.firstWinningNumber.slice(0, -2);

    jackpotFirstNumbersElement.innerHTML = `${restOfNumber}<span class="underline">${lastTwoDigits}</span>`;
    jackpotSecondNumbersElement.innerText = `${data.secondWinningNumber}`;
    jackpotThirdNumbersElement.innerText = `${data.thirdWinningNumber}`;
  }
}


// --------------------------------------------------------------------------------------------

function todayWinningNumber() {
  const db = getFirestore(app);

  // Query Firestore for the most recent winning number for that day, ordered by date
  const ref = collection(db, "Boledo");
  const q = query(
    ref,
    where("status", "==", "active"),
    orderBy("date", "desc"), // Order by timestamp in descending order
    limit(1)  // Limit to the latest result
  );

  getDocs(q)
    .then((querySnapshot) => {
      const winningNumbers = querySnapshot.docs.map((doc) => doc.data());

      if (winningNumbers.length > 0) {
        const data = winningNumbers[0];  // The latest entry
        const timestampDate = data.date.toDate(); // Convert Firestore Timestamp to JavaScript Date
        const formattedDate = timestampDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

        document.getElementById("date").innerText = formattedDate;
        document.getElementById("winningNumber").innerText = data.winningNumber;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
}

// --------------------------------------------------------------------------------------------

function searchWinningNumber() {
  const game = document.getElementById("gameSelect").value;
  const selectedDate = document.getElementById("datePicker").value;

  if (!selectedDate) {
    document.getElementById("gameWinningTitle").textContent = "Select a Date";
    document.getElementById("winningNumber").textContent = "";
    return;
  }

  // Parse the user-selected date
  const userDate = new Date(selectedDate);

  // Get start and end of the selected day
  const startOfDay = new Date(userDate);
  startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00

  const endOfDay = new Date(userDate);
  endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59

  // Convert to Firestore Timestamps
  const fireStartDate = Timestamp.fromDate(startOfDay);
  const fireEndDate = Timestamp.fromDate(endOfDay);

  console.log("Searching from:", fireStartDate.toDate(), "to", fireEndDate.toDate());

  // Firestore Query
  const db = getFirestore();
  const winningsRef = collection(db, game);
  const q = query(
    winningsRef,
    where("date", ">=", fireStartDate),
    where("date", "<=", fireEndDate),
    where("status", "==", "active")
  );

  getDocs(q)
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No winning numbers found for this game and date");
        document.getElementById("gameWinningTitle").textContent = "No Results Found";
        document.getElementById("winningNumber").textContent = "";
      } else {
        const winningDoc = querySnapshot.docs[0].data();
        document.getElementById("gameWinningTitle").textContent = `${game} Winning Numbers`;
        if (game === "Jackpot") {
          document.getElementById("winningNumber").innerHTML =
            `${winningDoc.firstWinningNumber}<br>${winningDoc.secondWinningNumber}<br>${winningDoc.thirdWinningNumber}`;
        } else {
          document.getElementById("winningNumber").textContent = winningDoc.winningNumber;
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching winning numbers:", error);
    });
}

// --------------------------------------------------------------------------------------------

function searchAgent(district) {
  const db = getFirestore(app);
  const winningsRef = collection(db, "Agents");
  const q = query(
    winningsRef,
    where("district", "==", district),
    where("status", "==", "active")
  );

  getDocs(q)
    .then((querySnapshot) => {
      const agents = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      populateAgentsTable(agents);
    })
    .catch((error) => {
      console.error("Error fetching agent info:", error);
    });
}

function populateAgentsTable(agents) {
  const agentsTable = document.getElementById("agentsTable");
  agentsTable.innerHTML = ""; // Clear previous content

  if (agents.length === 0) {
    const noResultsRow = `<tr><td colspan="5" style="text-align: center;">No Agents Found</td></tr>`;
    agentsTable.insertAdjacentHTML("beforeend", noResultsRow);
  } else {
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

// --------------------------------------------------------------------------------------------

export {
  todayWinningNumber,
  searchWinningNumber,
  searchAgent,
  listenForChangesBoledo,
  listenForChangesJackpot,
};