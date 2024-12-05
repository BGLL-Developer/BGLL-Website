// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTMrLBvBniX58bDBQgWuUtuU-SAu1qIxs",
  authDomain: "bgll-update-portal-35881.firebaseapp.com",
  projectId: "bgll-update-portal-35881",
  storageBucket: "bgll-update-portal-35881",
  messagingSenderId: "830618333350",
  appId: "1:830618333350:web:7d6acbd0260d58c8f80467",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Import the AppCheck module and the ReCaptcha provider
import * as appCheck from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app-check.js";

// Initialize AppCheck with reCAPTCHA v3
const appCheckInstance = appCheck.initializeAppCheck(app, {
  provider: new appCheck.ReCaptchaV3Provider("6Le1a5MqAAAAAOOGH-qEa-_5L2B2sJQjWKFp4P9i"), // Replace with your reCAPTCHA v3 site key
  isTokenAutoRefreshEnabled: true, // Optional: Enables auto-refresh of AppCheck tokens
});

// Use the AppCheck.getToken() method to retrieve a token
appCheck.getToken(appCheckInstance).then((token) => {
  console.log('App Check Token:', token);

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

// Helper function to format the date to MM/DD/YYYY
function formatDateToMDY(date) {
  const month = (date.getMonth() + 1).toString().padStart(2, "");
  const day = date.getDate().toString().padStart(2, "");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

// Get the Monday of the current week
function getMondayOfCurrentWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // move back to the Monday of the current week
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0); // set the time to 00:00:00:000 for consistency
  return monday;
}

// Get the Sunday of the current week
function getSundayOfCurrentWeek() {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const diff = now.getDate() - dayOfWeek; // Calculate days since the last Sunday
  const sunday = new Date(now.setDate(diff));
  sunday.setHours(0, 0, 0, 0); // set the time to 00:00:00:000 for consistency
  return sunday;
}

// Function to query winning numbers for a given date
function queryWinningNumbers(db, collectionName, date, status, callback) {
  const ref = collection(db, collectionName);
  const q = query(
    ref,
    where("date", "==", date),
    where("status", "==", status)
  );
  getDocs(q)
    .then((querySnapshot) => {
      const winningNumbers = querySnapshot.docs.map((doc) => doc.data());
      callback(winningNumbers);
    })
    .catch((error) => {
      console.error(`Error getting documents for ${date}:`, error);
    });
}

function listenForChangesBoledo() {
  const db = getFirestore(app);
  const monday = getMondayOfCurrentWeek();

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];
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
    // 0 represents Sunday
    console.log("Today is Sunday, not displaying Boledo numbers.");
    Object.values(dayElements).forEach((id) => {
      document.getElementById(id).innerHTML = "";
    });
    return;
  }

  daysOfWeek.forEach((day, index) => {
    const currentDay = new Date(monday);
    currentDay.setDate(monday.getDate() + index);
    const formattedDate = formatDateToMDY(currentDay);

    queryWinningNumbers(
      db,
      "Boledo",
      formattedDate,
      "active",
      (winningNumbers) => {
        const dayElement = document.getElementById(dayElements[day]);
        dayElement.innerHTML = ""; // Clear previous numbers

        if (winningNumbers.length > 0) {
          const data = winningNumbers[0]; // Assuming one document per day
          dayElement.innerText = `${data.winningNumber}`;
        } else {
          console.log(
            `No Boledo data available for ${day + ": " + formattedDate}`
          );
        }
      }
    );
  });
}

function listenForChangesJackpot() {
  const db = getFirestore(app);
  const sunday = getSundayOfCurrentWeek();
  const formattedDate = formatDateToMDY(sunday);

  queryWinningNumbers(
    db,
    "Jackpot",
    formattedDate,
    "active",
    (winningNumbers) => {
      const jackpotFirstNumbersElement = document.getElementById(
        "jackpotFirstWinningNumber"
      );
      const jackpotSecondNumbersElement = document.getElementById(
        "jackpotSecondWinningNumber"
      );
      const jackpotThirdNumbersElement = document.getElementById(
        "jackpotThirdWinningNumber"
      );
      jackpotFirstNumbersElement.innerHTML = ""; // Clear previous numbers
      jackpotSecondNumbersElement.innerHTML = ""; // Clear previous numbers
      jackpotThirdNumbersElement.innerHTML = ""; // Clear previous numbers

      if (winningNumbers.length > 0) {
        winningNumbers.forEach((data) => {
          const lastTwoDigits = data.firstWinningNumber.slice(-2);
          const restOfNumber = data.firstWinningNumber.slice(0, -2);
          jackpotFirstNumbersElement.innerHTML = `${restOfNumber}<span class="underline">${lastTwoDigits}</span>`;
          jackpotSecondNumbersElement.innerText = `${data.secondWinningNumber}`;
          jackpotThirdNumbersElement.innerText = `${data.thirdWinningNumber}`;
        });
      } else {
        console.log("No data available for this Sunday");
      }
    }
  );
}

export {
  todayWinningNumber,
  searchWinningNumber,
  searchAgent,
  listenForChangesBoledo,
  listenForChangesJackpot,
};

// --------------------------------------------------------------------------------------------

let counter = 0;

function todayWinningNumber(dateString) {
  const formattedDate = formatDateToMDY(dateString);
  const db = getFirestore(app);
  queryWinningNumbers(
    db,
    "Boledo",
    formattedDate,
    "active",
    (winningNumbers) => {
      if (winningNumbers.length > 0) {
        const data = winningNumbers[0];
        const parsedDate = new Date(dateString);
        document.getElementById("date").innerText = isNaN(parsedDate.getDate())
          ? dateString
          : parsedDate.toDateString();
        document.getElementById("winningNumber").innerText = data.winningNumber;
      } else {
        console.log("No data available for", formattedDate);
        todayWinningNumber(getYesterdayDateString());
      }
    }
  );
}

function getYesterdayDateString() {
  const today = new Date();
  today.setDate(today.getDate() - ++counter);
  return today;
}

function searchWinningNumber() {
  const game = document.getElementById("gameSelect").value;
  const selectedDate = document.getElementById("datePicker").value;
  if (!selectedDate) {
    document.getElementById("gameWinningTitle").textContent = "Select a Date";
    document.getElementById("winningNumber").textContent = "";
    return;
  }

  const userDateParts = selectedDate.split("-");
  const userMonth = userDateParts[1].replace(/^0+/, "");
  const userDay = userDateParts[2].replace(/^0+/, "");
  const userYear = userDateParts[0];
  const formattedDate = `${userMonth}/${userDay}/${userYear}`;

  const db = getFirestore(app);
  const winningsRef = collection(db, game);
  const q = query(
    winningsRef,
    where("date", "==", formattedDate),
    where("status", "==", "active")
  );

  getDocs(q)
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No winning numbers found for this game and date");
        document.getElementById("gameWinningTitle").textContent =
          "No Results Found";
        document.getElementById("winningNumber").textContent = "";
      } else {
        const winningDoc = querySnapshot.docs[0].data();
        document.getElementById(
          "gameWinningTitle"
        ).textContent = `${game} Winning Numbers`;
        if (game === "Jackpot") {
          document.getElementById(
            "winningNumber"
          ).innerHTML = `${winningDoc.firstWinningNumber}<br>${winningDoc.secondWinningNumber}<br>${winningDoc.thirdWinningNumber}`;
        } else {
          document.getElementById("winningNumber").textContent =
            winningDoc.winningNumber;
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching winning numbers:", error);
    });
}

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


function onClick(e) {
  e.preventDefault();
  grecaptcha.enterprise.ready(async () => {
    const token = await grecaptcha.enterprise.execute('6LdoWJMqAAAAAESI5V_Yjj8tJE9-2jp2H8KhK5zG', { action: 'LOGIN' });
  });
}