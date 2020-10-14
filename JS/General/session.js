"use strict";
window.addEventListener("load", loadPage);

/*
    Organisation:   A^3 Training and Consultancy
    Author:         Ethan Tan
    Date:           30/06/2020

    File name:      session.js
    Used By:        All html files
    Description:    for current session state (logged in; not logged in yet)
*/

// stores current page's location
function storePrev() {
    sessionStorage.setItem("previousPg", window.location.href);
}

// goes to previous page
function returnToPrevPg() {
    window.location.href = sessionStorage.getItem("previousPg");
}

// loads the page
function loadPage() {
    modifyNavbar(sessionStorage.getItem("loggedIn") === "yes");
}

// modifies main navbar based on whether the user has logged in
function modifyNavbar(loggedIn) {
    // https://www.flaticon.com/free-icon/lock_861830?term=lock&page=1&position=13
    // https://www.flaticon.com/free-icon/unlock_861831?term=lock&page=1&position=96
    if (!window.location.href.includes("login.html")) {
        if (loggedIn) {
            document.getElementById("login").innerHTML = "<a href=\"#\" class=\"nav-link text-light\" onclick=\"logout(false)\"><img src=\"../Images/General/Navbar/unlock32.png\" alt=\"\" class=\"pb-2 d-none d-xl-inline\"><img src=\"../Images/General/Navbar/unlock24.png\" alt=\"\" class=\"pb-2 d-inline d-xl-none\">&nbsp;&nbsp;Log Out</a>";
        }
        else {
            document.getElementById("login").innerHTML = "<a href=\"./login.html\" class=\"nav-link text-light\" onclick=\"storePrev()\"><img src=\"../Images/General/Navbar/lock32.png\" alt=\"\" class=\"pb-2 d-none d-xl-inline\"><img src=\"../Images/General/Navbar/lock24.png\" alt=\"\" class=\"pb-2 d-inline d-xl-none\">&nbsp;&nbsp;Login</a>";
        }
    }
    else {
        document.getElementById("login").innerHTML = "<a href=\"#\" class=\"nav-link text-light\"><img src=\"../Images/General/Navbar/lock32.png\" alt=\"\" class=\"pb-2 d-none d-xl-inline\"><img src=\"../Images/General/Navbar/lock24.png\" alt=\"\" class=\"pb-2 d-inline d-xl-none\">&nbsp;&nbsp;Login</a>";
    }
}

// logs use out of his/her account
function logout() {
    window.alert("You have successfully logged out!");
    sessionStorage.setItem("loggedIn", "no");
    if (window.location.href.includes("payment.html") || window.location.href.includes("customer_survey.html")) {
        returnToPrevPg();
    }
    else {
        window.location.reload();
    }
}