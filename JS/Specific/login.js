"use strict";
/*
    Organisation:   A^3 Training and Consultancy
    Author:         Ethan Tan
    Date:           30/06/2020

    File Name:      login.js
    Used By:        login.html
    Description:    for login page
*/

// for new members to register (logs in)
function signUp() {
    if (validateForm("signingUp")) {
        if (document.getElementById("confirmPW").value === document.getElementById("newPW").value) {
            sessionStorage.setItem("loggedIn", "yes");
            sessionStorage.setItem("email", document.getElementById("newEmail").value);
            resetCart();
            returnToPrevPg();
        }
        else {
            alert("Your passwords do not match!");
        }
    }
}

// for existing members to login
function signIn() {
    if (validateForm("signingIn")) {
        sessionStorage.setItem("loggedIn", "yes");
        sessionStorage.setItem("email", document.getElementById("email").value);
        resetCart();
        returnToPrevPg();
    }
}

// checks if the terms and conditions are accepted before allowing the user to register
function checkTCs() {
    if (document.getElementById("tc").checked) {
        document.getElementById("signup").outerHTML = "<button type=\"submit\" class=\"btn btn-dark\" onmousedown=\"signUp()\" id=\"signup\">Sign Up</button>";
    }
    else {
        document.getElementById("signup").outerHTML = "<button type=\"submit\" class=\"btn btn-dark\" id=\"signup\" title=\"Please agree to our Terms & Conditions to proceed\" disabled>Sign Up</button>";
    }
}