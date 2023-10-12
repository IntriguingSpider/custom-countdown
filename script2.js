const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdonwBtn = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

//State Variables
let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set Date Input with Todays Date as Minimun
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//Populate Countdown - Complete UI
const updateDOM = function () {
  const now = new Date().getTime();
  const distance = countdownValue - now;

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);
  //Populate Countdown
  countdownElTitle.textContent = `${countdownTitle}`;
  timeElements[0].innerText = `${days}`;
  timeElements[1].innerText = `${hours}`;
  timeElements[2].innerText = `${minutes}`;
  timeElements[3].innerText = `${seconds}`;
  //Hide input
  inputContainer.hidden = true;
  //Show Countdown
  countdownEl.hidden = false;
};

//Updates the Countdown to the inputted numbers
const updateCountdown = function (e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  //Get Number version of current Date, updateDOM
  countdownValue = new Date(countdownDate).getTime();
  updateDOM();
};

//Event Listener
countdownForm.addEventListener("submit", updateCountdown);

//Countdown Timer

//3) Subtract current time from future time = time left

//4) Put time left into DOM with setInterval per second

const ms = Date.now();
console.log(ms);
