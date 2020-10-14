/*
    Organisation:   A^3 Training and Consultancy
    Author:         Ethan Tan
    Date:           30/06/2020

    File Name:      contact_us.js
    Used By:        contact_us.html
    Description:    for contact us page
*/

function submitNote() {
    if (validateForm("message_form")) {
        alert("Your message has been received!\nWe'll get back to you as soon as possible!\n\nHappy Coding!");
    }
}