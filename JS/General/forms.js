"use strict";
/*
    Organisation:   A^3 Training and Consultancy
    Author:         Ethan Tan
    Date:           30/06/2020

    File Name:      forms.js
    Used By:        contact_us.html, customer_survey, lectures.html, login.html, payment.html, tutorials.html, workshops.html
    Description:    utility function(s) for web forms
*/

// validates an entire form, returns true for valid and false for invalid
function validateForm(formID) {
    let controls = document.querySelectorAll(`form#${formID} input, form#${formID} select, form#${formID} textarea`);
    let validForm = true;
    for (let formInput of controls) {
        if (!formInput.checkValidity()) {
            validForm = false;
            break;
        }
    }
    return validForm;
}