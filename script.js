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


