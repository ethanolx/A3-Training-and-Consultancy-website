"use strict";
window.addEventListener("load", displayLinkToCS);

/*
    Organisation:   A^3 Training and Consultancy
    Author:         Ethan Tan
    Date:           30/06/2020

    File name:      enrolment.js
    Description:    for enrolment
*/

// displays the link to the customer survey form if the user has logged in
function displayLinkToCS() {
    if (sessionStorage.getItem("loggedIn") === "yes") {
        document.getElementById("custSurvLink").innerHTML = "<a class=\"btn btn-block btn-dark col-12 mt-2 mb-2\" href=\"./customer_survey.html\" onclick=\"storePrev()\">Help us improve our services by taking our quick customer survey today!</a>";
        document.querySelector("#nav_panel ul").insertAdjacentHTML("beforeend", "<li class=\"nav-item\"><a class=\"nav-link\" href=\"#custSurvLink\">Customer Survey</a></li>");
    }
}