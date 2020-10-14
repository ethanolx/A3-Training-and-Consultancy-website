"use strict";
window.addEventListener("load", appendEncouragement);
window.addEventListener("load", checkEnrolmentPermission);

/*
    Organisation:   A^3 Training and Consultancy
    Author:         Ethan Tan
    Date:           30/06/2020

    File Name:      enrolment.js
    Used By:        lectures.html, tutorials.html, workshops.html, payment.html
    Description:    for enrolling in courses
*/

// returns lecture, tutorial or workshop based on the current page's title
function getCourseType() {
    let heading = document.querySelector("div.container>div.row:nth-child(2)>h4").textContent;
    let type = heading.substr(4, heading.length - 5).toLowerCase();
    return type;
}

// appends the text "Enrol in our ...  course today" to each course card
function appendEncouragement() {
    let type = getCourseType();
    let cards = document.querySelectorAll("div.card");
    for (let card of cards) {
        let msg = `<p><small>Enrol in our ${card.children[0].textContent} ${capitalise(type)} course today!</small></p>`;
        card.children[1].insertAdjacentHTML("beforeend", msg);
    }
}

// for enrolling in courses
function enrol(selectID) {
    if (document.getElementById(selectID).checkValidity()) {
        let enrolled = document.querySelectorAll(`#${selectID} option`);
        let selectedCoursesToEnrolIn = sessionStorage.getItem("enrolment").split(", ");
        selectedCoursesToEnrolIn = selectedCoursesToEnrolIn.filter((course) => course.trim() !== "");
        for (let el of enrolled) {
            if (el.selected && selectedCoursesToEnrolIn.indexOf(el.value.split(", ")[0]) === -1) {
                selectedCoursesToEnrolIn.push(el.value);
            }
        }
        sessionStorage.setItem("enrolment", selectedCoursesToEnrolIn.join(", "));
    }
    else {
        alert("Please select an item from the list!");
    }
}

// go to payment.js for payment if there are courses enrolled
function proceedToPayment() {
    if (sessionStorage.getItem("enrolment").trim() !== "") {
        storePrev();
        window.location.href = "./payment.html";
    }
    else {
        alert("You have not enrolled into any courses as of yet!");
    }
}

// displays enrolment form or reminder depending on the session state (logged in or not)
function checkEnrolmentPermission() {
    if (document.getElementById("enrolment") !== null) {
        if (sessionStorage.getItem("loggedIn") === "yes") {
            allowEnrolment();
        }
        else {
            showEnrolmentPrompt();
        }
    }
}

// returns the full course name (course name + course type) [ie Programming Basics Workshop]
function getFullCourseName(courseName) {
    return courseName.concat(" ", capitalise(getCourseType())).trim();
}

// returns a word string with only the first letter capitalised
function capitalise(str) {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
}

// returns the fee of a specific course
function getFee(courseObj) {
    return courseObj.querySelector("footer.card-footer .fee").textContent.trim().substring(12);
}

// shows enrolment instructions and enrolment form
function allowEnrolment() {
    let courseType = getCourseType() + "s";
    let enrolmentText = `<div class="col-md-6"><article class=\"text-white\"><h5>Are you interested?</h5><h6 class=\"mt-3\">Enrolment Instructions</h6><ol id=\"enrol_instructions\"><li>Select your desired courses in the following enrolment form</li><li>Press the 'Proceed to payment' button</li><li>Fill up your particulars in the Payment page</li><li>Check out</li><li>Instructions on how to access the courses will be sent to your email address</li></ol></article></div><div class=\"col-md-6\"><form action=\"#\" class=\"needs-validation\"><fieldset class=\"border pl-3 pr-3 pb-3\"><legend class=\"text-success pl-2\">Enrol Here</legend><div class=\"form-group\"><label class=\"col-form-label text-white\" for=\"${courseType}\">Select the ${courseType} you're interested in:</label><select name=\"${courseType}\" id=\"${courseType}\" class=\"form-control\" size=\"${document.querySelectorAll(".card.course").length + 1}\" multiple required><option value=\"\" disabled>--You may choose more than one--</option>`;
    for (let option of document.querySelectorAll(".card.course")) {
        enrolmentText += `<option value=\"${getFullCourseName(option.querySelector("header.card-header").textContent).concat(", ", getFee(option))}\">` + getFullCourseName(option.querySelector("header.card-header").textContent) + "</option>";
    }
    enrolmentText += `</select></div><div class=\"form-row\"><div class=\"col-sm-6\"><button type=\"button\" class=\"btn btn-block btn-outline-success mt-1\" onclick=\"enrol('${courseType}')\">ENROL</button></div><div class=\"col-sm-6\"><button type=\"button\" class=\"btn btn-block btn-outline-success mt-2 mt-sm-1\" onclick=\"proceedToPayment()\">PAY NOW</button></div></div></fieldset></form></div>`;
    document.getElementById("enrolment").innerHTML = enrolmentText;
}

// shows reminder to log in before enrolling
function showEnrolmentPrompt() {
    document.getElementById("enrolment").innerHTML = "<div class=\"col-12\"><p class=\"text-white text-center\">Please log in to enrol in our courses.</p></div>";
}

// resets courses enrolled in
function resetCart() {
    sessionStorage.setItem("enrolment", "");
}