"use strict";
window.addEventListener("load", getUserEmail);

/*
    Organisation:   A^3 Training and Consultancy
    Author:         Ethan Tan
    Date:           30/06/2020

    File Name:      customer_survey.js
    Used By:        customer_survey.html
    Description:    for customer survey page
*/

function getUserEmail() {
    if (sessionStorage.getItem("email") !== null) {
        document.getElementById("email").value = sessionStorage.getItem("email");
    }
    else {
        document.getElementById('email').readOnly = false;
    }
}

function submitCustSurvey() {
    if (validateForm("customer_survey")) {
        alert("Thank you for your response!\nHave a great day ahead!");
        returnToPrevPg();
    }
}