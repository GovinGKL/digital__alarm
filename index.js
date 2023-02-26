let selectMenu = document.querySelectorAll("select");
const current_time = document.getElementById("current_time");
const setAlarmBtn = document.querySelector("button");
const content = document.querySelector(".content");
const Snooze = document.querySelector(".Snooze");
const ringTone = new Audio("ringTone.mp3");
const displayMessage = document.getElementById("displayMessage");
const shakeImg = document.querySelector(".shake");
const motivationQuote = document.querySelector(".motivation");
let alarmTime;
let snoozeTime;
let timeValue;

let isAlarmSet = false;

function showMessage(message) {
  displayMessage.textContent = message;
  displayMessage.style.opacity = 1;

  setTimeout(function () {
    displayMessage.style.transition = "opacity 1s";
    displayMessage.style.opacity = 0;
  }, 4000);
}

//To insert Hours
for (i = 12; i > 0; i--) {
  console.log(i);
  if (i < 10) {
    i = "0" + i;
  } else {
    i = i;
  }
  const option = `<option value="${i}">${i}</option>`; // appending the numbers from 01 to 12 for selecting hours
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// To insert Minutes
for (i = 59; i >= 0; i--) {
  console.log(i);
  if (i < 10) {
    i = "0" + i;
  } else {
    i = i;
  }
  const option = `<option value="${i}">${i}</option>`; // appending the numbers from 00 to 59 for selecting Minutes
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

//for AP/PM
for (i = 2; i > 0; i--) {
  let ampm;
  if (i == 1) {
    ampm = "AM";
  } else {
    ampm = "PM";
  }
  const option = `<option value="${ampm}">${ampm}</option>`; // giving users to define there time format
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  // adding style effects
  const colors = [
    "#ff69b4",
    "#00bfff",
    "#ffd700",
    "#ff4500",
    "#32cd32",
    "#8b00ff",
    "#ff1493",
    "#1e90ff",
    "#ff8c00",
    "#00fa9a",
    "#dc143c",
    "#7fff00",
    "#9400d3",
    "#00ced1",
    "#ffa500",
    "#ff00ff",
  ]; // array of colors
  const randomIndex = Math.floor(Math.random() * colors.length); // get random index
  const randomColor = colors[randomIndex]; // get random color
  current_time.style.textShadow = `0 0 5px ${randomColor}, 0 0 10px ${randomColor}, 0 0 15px ${randomColor}, 0 0 20px ${randomColor}, 0 0 30px ${randomColor}, 0 0 40px ${randomColor}, 0 0 50px ${randomColor}, 0 0 60px #fff`; // set new text-shadow style

  // To get the hours minutes and seconds
  const today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();

  // to set the median to PM if the hours is more than 12
  let ampm = h >= 12 ? "PM" : "AM";

  // if hours is more than 12 deducting 12 to show 12 hour format
  if (h > 12) {
    h -= 12;
    // if the hours is midnight i.e 0 hours considering a new day for the following below events
  } else if (h === 0) {
    h = 12;
  }

  // if the hour is less than 10 add 0 before the hour
  if (h < 10) {
    h = "0" + h;
  } else {
    h = h;
  }

  // if the minute is less than 10 add 0 before the minute
  if (m < 10) {
    m = "0" + m;
  } else {
    m = m;
  }

  // if the second is less than 10 add 0 before the second
  if (s < 10) {
    s = "0" + s;
  } else {
    s = s;
  }

  // console.log(`${h}:${m}:${s}`);

  current_time.innerHTML = `${h}:${m}:${s} ${ampm}`;

  // console.log(`${h}:${m}:${s} ${ampm}`);

  if (alarmTime == `${h}:${m}:${s} ${ampm}`) {
    console.log("ringing");
    // alert("ringing");
    ringTone.play();
    ringTone.loop = true;
    if ((ringTone.loop = true)) {
      // Show the Snooze button when the alarm is ringing
      Snooze.classList.add("show");
      // if alarm is ringing make the events shake
      current_time.classList.add("shake");
      shakeImg.classList.add("shakeImg");
    }
  }

  if (snoozeTime == `${h}:${m}:${s} ${ampm}`) {
    ringTone.play();
    ringTone.loop = true;

    // if alarm is ringing make the events shake
    current_time.classList.add("shake");
    // Show the Snooze again button when the alarm is ringing and shake the events
    Snooze.classList.add("show");
    shakeImg.classList.add("shakeImg");
  }
}, 1000);

function setTheAlarm() {
  // if alarm is not set
  if (isAlarmSet) {
    content.classList.remove("disable");
    // Hide the Snooze button when the alarm is stopped or snoozed again
    Snooze.classList.remove("show");
    // stop shaking the events if the alarm goes off or no alarm set
    current_time.classList.remove("shake");
    shakeImg.classList.remove("shakeImg");
    // stop the alarm sound
    ringTone.pause();
    // default set Alarm button when alarm is not set it changes when alarm is set
    setAlarmBtn.innerText = "Set Alarm";
    return (isAlarmSet = false);
  }

  // gets the value of the time user selected in hours, minutes, and seconds
  timeValue = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
  console.log(timeValue);

  // if setAlarmBtn is clicked without setting the timer user gets an alert message described below
  if (
    timeValue.includes("Hours") ||
    timeValue.includes("minutes") ||
    timeValue.includes("AM//PM")
  ) {
    return showMessage("Please enter the valid timer");
  }

  // creating new Date object and setting its hour ,minute and seconds based on the values selected from the option drop box
  let selectedTimer = new Date();
  selectedTimer.setHours(selectMenu[0].value);
  selectedTimer.setMinutes(selectMenu[1].value);
  selectedTimer.setSeconds(0);

  // initializing variables to Select the hour, minute, and AM/PM elements
  const hourSelect = selectMenu[0];
  const minuteSelect = selectMenu[1];
  const amPmSelect = selectMenu[2];

  // the following mentioned code ensures that the alarm time is set correctly and accurately takes into account the user's selected time, AM/PM designation, and whether the alarm time has already passed for the day.
  //Create a new Date object for the current date and time.
  const now = new Date();
  //Create a new Date object for the alarm time, which will be based on the user's selected time.
  let alarmTimer = new Date();
  //Set the hours and minutes of the alarm time based on the user's selected values from the hourSelect and minuteSelect HTML select elements.
  alarmTimer.setHours(parseInt(hourSelect.value));
  alarmTimer.setMinutes(parseInt(minuteSelect.value));
  //If the user has selected "PM" and the alarm hour is not equal to 12, add 12 hours to the alarm time. If the user has selected "AM" and the alarm hour is equal to 12, set the alarm hour to 0 (midnight).
  if (amPmSelect.value === "PM" && alarmTimer.getHours() !== 12) {
    alarmTimer.setHours(alarmTimer.getHours() + 12);
  } else if (amPmSelect.value === "AM" && alarmTimer.getHours() === 12) {
    alarmTimer.setHours(0);
  }
  //If the alarm time is earlier than the current time, add one day to the alarm time to ensure it is set for the next day.
  if (alarmTimer < now) {
    alarmTimer.setDate(alarmTimer.getDate() + 1);
  }
  // If the current time is later than or equal to the alarm time (meaning the alarm time has already passed for the day), add one day to the alarm time to ensure it is set for the next day.
  if (now.getTime() >= alarmTimer.getTime()) {
    // the alarm time has already passed today, set it for tomorrow
    alarmTimer.setDate(alarmTimer.getDate() + 1);
  }

  //his code calculates the difference between the current time (now) and the alarm time (alarmTimer) and stores it in a variable called timeDiff. The difference is calculated in milliseconds, and is logged to the console for debugging purposes.
  const timeDiff = alarmTimer - now;
  console.log(timeDiff);
  //hoursDiff: Divide timeDiff by the number of milliseconds in an hour (1000 * 60 * 60), and round down to the nearest integer.
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
  //minutesDiff: Divide timeDiff by the number of milliseconds in a minute (1000 * 60), and take the remainder when divided by 60. Then, round down to the nearest integer.
  const minutesDiff = Math.floor((timeDiff / (1000 * 60)) % 60);
  //secondsDiff: Divide timeDiff by the number of milliseconds in a second (1000), and take the remainder when divided by 60. Then, round down to the nearest integer.
  const secondsDiff = Math.floor((timeDiff / 1000) % 60);
  //daysDiff: Divide timeDiff by the number of milliseconds in a day (1000 * 60 * 60 * 24), and round down to the nearest integer.
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (
    isNaN(hoursDiff) ||
    isNaN(minutesDiff) ||
    isNaN(secondsDiff) ||
    hoursDiff < 0 ||
    minutesDiff < 0 ||
    secondsDiff < 0
  ) {
    //This code checks if any of the time differences calculated above are NaN (Not a Number) or negative. If any of the time differences are invalid, the code will execute the // Handle invalid input values here block. Otherwise, the code will execute the // Show the countdown message block.
    // side note
    // here 0 means 0 hours,
  } else {
    // if the difference between the alarm time and the current time is greater than 0 hours, but less than or equal to 24 hours.
    if (daysDiff > 0) {
      showMessage(
        `Alarm will remind in ${daysDiff} day${daysDiff > 1 ? "s" : ""}`
      );
    }
    // if still hours left until the alarm rings
    else if (hoursDiff > 0) {
      showMessage(
        `Alarm will remind in ${hoursDiff} Hours and ${minutesDiff} minutes from now`
      );
    }
    // if still the minutes left until the alarm rings
    else if (minutesDiff > 0) {
      //if the number of minutes left is exactly 1 and the number of seconds left is less than 60
      if (minutesDiff === 1 && secondsDiff < 60) {
        showMessage(`Alarm will remind in less than one minute`);
      }
      // if the number of minutes left is more than 1 or 59 minutes then display the remaining time
      else {
        showMessage(`Alarm will remind in ${minutesDiff} Minutes`);
      }
    }
    // Check if the alarm time is the same as the current time
    if (hoursDiff === 0 && minutesDiff === 0 && secondsDiff === 0) {
      showMessage("Alarm is set for now");
      showMessage("Alarm is set for now. It will remind in one day.");
    }

    // If the user has set the alarm, disable the option values
    isAlarmSet = true;
    alarmTime = "";
    content.classList.add("disable");
    alarmTime = timeValue;

    setAlarmBtn.innerText = "Clear Alarm";
  }
}

// if the alarm button is clicked countdown begins
setAlarmBtn.addEventListener("click", setTheAlarm);

function Snoozing() {
  setTheAlarm();
  // if the user clicks on snooze display the message as such
  showMessage("Alarm will ring again in 5 minutes");
  isAlarmSet = true;
  alarmTime = "";
  content.classList.add("disable");
  alarmTime = timeValue;

  setAlarmBtn.innerText = "Clear Alarm";

  let SnoozeTimer = new Date();
  let snoozeHour = SnoozeTimer.getHours();
  // setting snooze time to 5 minutes
  let snoozeMinutes = SnoozeTimer.getMinutes() + 5;

  // setting the time format
  let ampm = snoozeHour >= 12 ? "PM" : "AM";

  // if hours is more than 12 deducting 12 to show 12 hour format
  if (snoozeHour > 12) {
    snoozeHour -= 12;
  } else if (snoozeHour === 0) {
    snoozeHour = 12;
  }

  // if the hour is less than 10 add 0 before the hour
  if (snoozeHour < 10) {
    snoozeHour = "0" + snoozeHour;
  } else {
    snoozeHour = snoozeHour;
  }
  // if the minutes is less than 10 add 0 before the minutes
  if (snoozeMinutes < 10) {
    snoozeMinutes = "0" + snoozeMinutes;
  } else {
    snoozeMinutes = snoozeMinutes;
  }

  const ringIn5Min = new Date();
  //setting time as per the snoozed timer which is 5 minutes
  ringIn5Min.setHours(snoozeHour);
  ringIn5Min.setMinutes(snoozeMinutes);

  snoozeTime = `${snoozeHour}:${snoozeMinutes}:00 ${ampm}`;
  console.log(snoozeTime);
}

// adding 5 minutes if the user clicks on the snooze button
Snooze.addEventListener("click", Snoozing);
