"use strict";
window.addEventListener("load", listSelectedCourses);
window.addEventListener("load", showEmail);
window.addEventListener("load", lockPayment);

/*
    Organisation:   A^3 Training and Consultancy
    Author:         Ethan Tan
    Date:           30/06/2020

    File Name:      payment.js
    Used By:        payment.html
    Description:    for payment page
*/

// shows total sum to pay
function showTotalCosts() {
    let enrolment = sessionStorage.getItem("enrolment").split(", ");
    let sum = 0;
    for (let i = 1; i < enrolment.length; i += 2) {
        let feeStr = enrolment[i].substr(enrolment[i].indexOf("$") + 1);
        let feeFloat = parseFloat(feeStr);
        sum += feeFloat;
    }
    document.getElementById("totalCosts").textContent = `US$${sum.toFixed(2)}`;
}

// shows all the courses the user has enrolled in
function listSelectedCourses() {
    let courses = document.getElementById("courses");
    let fees = document.getElementById("fees");
    if (sessionStorage.getItem("enrolment").trim() !== "") {
        let enrolment = sessionStorage.getItem("enrolment").split(", ");
        let coursesHTML = "";
        let feesHTML = "";
        for (let i = 0; i < enrolment.length; i += 2) {
            coursesHTML += "<option>";
            feesHTML += "<option>";
            coursesHTML += enrolment[i];
            feesHTML += enrolment[i + 1];
            feesHTML += "</option>";
            coursesHTML += "</option>";
        }
        coursesHTML += "<option>----------------------------</option><option>Total Sum to Pay</option>";
        feesHTML += "<option>------</option><option id=\"totalCosts\"></option>";
        courses.size = `${enrolment.length / 2 + 2}`;
        fees.size = courses.size;
        courses.innerHTML = coursesHTML;
        fees.innerHTML = feesHTML;
        showTotalCosts();
    }
    else {
        courses.innerHTML = "<option>NO COURSES</option>";
        courses.size = "1";
        fees.innerHTML = "<option>US$0.00</option>";
        fees.size = "1";
    }
}

// shows user's email
function showEmail() {
    document.getElementById("email").value = sessionStorage.getItem("email");
}

// displays success message when the user makes payment successfully
function makePayment(payment_form_ID) {
    if (validateForm(payment_form_ID)) {
        alert(`Your payment is successful!\n\nA confirmation email, as well as the instructions on how to access the course materials will be sent to ${sessionStorage.getItem("email")}.\n\nHave a great day!  :D`);
        resetCart();
        returnToPrevPg();
    }
}

// prevents the user from proceeding to pay if he/she has not enrolled in any courses
function lockPayment() {
    if (sessionStorage.getItem("enrolment").split(", ").length === 1) {
        document.getElementById("payment1").disabled = true;
        document.getElementById("payment1").title = "You have not enrolled into any courses yet";
        document.getElementById("payment2").disabled = true;
        document.getElementById("payment2").title = "You have not enrolled into any courses yet";
    }
}

// resets cart
function cancelPayment() {
    resetCart();
    lockPayment();
    listSelectedCourses();
}