// Function to fetch and inject content into a container
function includeHTML(url, containerId, callback) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
            if (callback) {
                callback();
            }
        });
}

// Include the header
includeHTML('header.html', 'header-container', function () {
    // Include the footer after the header is loaded
    includeHTML('footer.html', 'footer-container', function () {
        // Get the current page URL
        var currentUrl = window.location.href;

        // Get all navigation links
        var navLinks = document.querySelectorAll(".navbar-nav .nav-item .nav-link");

        // Loop through each navigation link
        navLinks.forEach(function (link) {
            // Check if the link's href matches the current URL
            if (link.href === currentUrl) {
                // Add the "active" class to the matching link
                link.classList.add("active");
            }
        });


    });

    var togglerButton = document.querySelector(".navbar-toggler");
    var togglerIcon = document.querySelector("#navbarTogglerIcon img");

    // Variable to keep track of the current state
    var isBarsIcon = true;

    togglerIcon.addEventListener("click", function () {
        // Toggle between the "bars" and "xmark-solid" icons
        if (isBarsIcon) {
            // Change the image source to xmark-solid.svg
            togglerIcon.src = "/assets/icons/xmark-solid.svg";
        } else {
            // Change the image source back to bars-solid.svg
            togglerIcon.src = "/assets/icons/bars-solid.svg";
        }

        // Toggle the state
        isBarsIcon = !isBarsIcon;
    });
});






function searchWinningNumber() {
    // Grab the selected game
    var selectedGame = document.getElementById('gameSelect').value;

    // Grab the selected date
    var selectedDate = document.getElementById('datePicker').value;

    // If the selected date is empty, display "No Winning Numbers Found"
    if (!selectedDate) {
        document.getElementById('gameWinningTitle').textContent = "Select a Date and Game";
        document.getElementById('winningNumber').textContent = "";
        return; // Exit the function early
    }

    // Split the date string into an array using the '-' separator
    var dateParts = selectedDate.split('-');

    // Extract day, month, and year components from the parsed date
    var year = parseInt(dateParts[0]);
    var month = parseInt(dateParts[1]);
    var day = parseInt(dateParts[2]);

    // Ensure leading zeros for single-digit day and month
    var formattedDay = (day < 10) ? '0' + day : day;
    var formattedMonth = (month < 10) ? '0' + month : month;

    // Format the date string in "DD/MM/YYYY" format
    var formattedDate = formattedDay + '/' + formattedMonth + '/' + year;

    // Perform a search in the respective database and update the UI
    var winningNumbers = getWinningNumbers(selectedGame, formattedDate);

    if (winningNumbers !== undefined && winningNumbers.length > 0) {
        document.getElementById('gameWinningTitle').textContent = selectedGame + " Winning Numbers for " + formattedDate;
        document.getElementById('winningNumber').textContent = winningNumbers;
    } else {
        document.getElementById('gameWinningTitle').textContent = "No Winning Numbers Found";
        document.getElementById('winningNumber').textContent = "";
    }
}

// Function to get winning number based on game and date
function getWinningNumbers(game, date) {
    let result = '';

    if (game === 'boledo') {
        result = boledoDatabase[date];
    } else if (game === 'ordinary Lottery') {
        result = ordinaryLotteryDatabase[date];
    } else if (game === 'jackpot') {
        const winningNumbers = jackpotDatabase[date];
        if (winningNumbers) {
            result = "First Prize: " + winningNumbers[0] + " Second Prize: " + winningNumbers[1] + " Third Prize: " + winningNumbers[2];
        }
    }

    // Check if the result is undefined before returning
    if (result !== undefined) {
        return result;
    } else {
        return "";
    }
}
