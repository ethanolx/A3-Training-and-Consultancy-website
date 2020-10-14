"use strict";
window.addEventListener("load", createCalendar);

/*
    Organisation:   A^3 Training and Consultancy
    Author:         Ethan Tan
    Date:           30/06/2020

    File Name:      calendar.js
    Used By:        workshops.html
    Description:    builds a the workshops calendar (web table)
*/

// creates calendar
function createCalendar() {
    let date = new Date();
    let calendarHTML = "";
    calendarHTML += calCaption(date);
    calendarHTML += calHead();
    calendarHTML += calDays(date);
    document.getElementById("calendar_table").innerHTML = calendarHTML;
}

// creates calendar caption
function calCaption(date) {
    let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `<caption class="lead text-light"> ${monthName[date.getMonth()]} ${date.getFullYear()} </caption>`;
}

// creates calendar header
function calHead() {
    let dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let rowHTML = "<tr>";
    for (let i = 0; i < dayNames.length; i++) {
        rowHTML += (`<th scope=\"col\" class=\"calendar_weekdays text-center\">${dayNames[i]}</th>`);
    }
    rowHTML += "</tr>";
    return rowHTML;
}

// returns number of days in the target month
function daysInMonth(date) {
    let daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let thisYear = date.getFullYear();
    let thisMonth = date.getMonth();
    if (thisYear % 4 === 0) {
        if ((thisYear % 100 != 0) || (thisYear % 400 === 0)) { daysPerMonth[1] = 29; }
    }
    return daysPerMonth[thisMonth];
}

// creates calendar cells
function calDays(date = new Date()) {
    let totalDays = daysInMonth(date);
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth(), totalDays);
    let htmlCode = "";
    let offset = firstDay.getDay();
    let today = date.getDate();
    let numberOfRows = (firstDay.getDay() + 6 - lastDay.getDay() + totalDays) / 7;

    for (let i = 0; i < numberOfRows; i++) {
        htmlCode += "<tr>";
        for (let dayNum = 0; dayNum <= 6; dayNum++) {
            let currentPos = dayNum + i * 7 + 1;
            let currentDate = currentPos - offset;
            if (currentPos <= offset || currentPos > (totalDays + offset)) {
                htmlCode += "<td></td>";
            }
            else if (currentDate === today) {
                htmlCode += `<td class=\"calendar_dates\" id=\"calendar_today\"><small class=\"day_label\">${currentDate}</small>` + dayEvent[currentDate] + "</td>"
            }
            else {
                htmlCode += `<td class=\"calendar_dates\"><small class=\"day_label\">${currentDate}</small>` + dayEvent[currentDate] + "</td>";
            }
        }
        htmlCode += "</tr>";
    }
    return htmlCode;
}