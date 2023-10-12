const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");
const titleInput = document.getElementById("title");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownBtn = document.getElementById("countdown-buton");
const timeElements = document.querySelectorAll("span");

const completeContainer = document.getElementById("complete");
const completeInfo = document.getElementById("complete-info");
const newCountdown = document.getElementById("complete-button");

//State Variables
let countdownTitle = "";
let countdownDate = "";
let countdownTimer = "";
let intervalId;
//

//Set Date Input with Todays Date as Minimun
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

//Updates the Countdown to the inputted numbers
const updateCountdown = function (e) {
  e.preventDefault();
  //Extract the Title/Date inputted into variables
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  //Create Date object of the futureDate, Convert Futuredate into miliseconds
  const futureTime = new Date(countdownDate).getTime();
  //Get miliseconds of current Time
  const currentTime = Date.now();
  //Subracting futureTime - todayTime = Milliseconds until countdown over
  countdownTimer = futureTime - currentTime;
  //Data validation
  if (!countdownTitle) {
    alert(`Insert a Title`);
    return;
  }
  if (!countdownDate || countdownTimer < 0) {
    alert(`Insert a Valid Date`);
    return;
  }
  countdownElTitle.innerText = titleInput.value;

  //Showing countdown in DOM, starting count
  showTimerContainer();
  startInterval();
  //Delete localStorage, set new localStorage.
};

//Event Listener
countdownForm.addEventListener("submit", updateCountdown);

const startInterval = function () {
  intervalId = setInterval(function () {
    //Adjusting by -1 second
    countdownTimer -= 1000;
    //Calculating the time for the variables
    const seconds = Math.floor((countdownTimer / 1000) % 60);
    const minutes = Math.floor((countdownTimer / (1000 * 60)) % 60);
    const hours = Math.floor((countdownTimer / (1000 * 60 * 60)) % 24);
    const days = Math.floor(countdownTimer / (1000 * 60 * 60 * 24));
    //Changing the value of the elements
    timeElements[3].innerText = seconds;
    timeElements[2].innerText = minutes;
    timeElements[1].innerText = hours;
    timeElements[0].innerText = days;
    console.log(`interval is on`, seconds);
    storeTimer();
    if (countdownTimer === 0) {
      completeCountdown();
      clearInterval(intervalId);
    } else {
      return;
    }
  }, 1000);
};

//Event Listener for Reset / Start new countdown
countdownEl.addEventListener("click", function (e) {
  if (e.target.id === "countdown-button") {
    resetCountdown();
  } else {
    return;
  }
});
newCountdown.addEventListener("click", function (e) {
  if (e.target.id === "complete-button") {
    resetCountdown();
  }
});

const resetCountdown = function () {
  showInputContainer();
  //Reset the state variable for time and Title
  countdownTitle = "";
  countdownDate = "";
  countdownTimer = "";
  //Reset the DOM
  dateEl.value = "";
  titleInput.value = "";
  clearInterval(intervalId);
  //Clear our storage
  clearStorage();
};

//Function to show Timer Container
const showTimerContainer = function () {
  inputContainer.hidden = true;
  countdownEl.hidden = false;
  completeContainer.hidden = true;
};

//Function to show Input Container
const showInputContainer = function () {
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  completeContainer.hidden = true;
};

//Function to store timer in Local Storage
const storeTimer = function () {
  //Need to store countdownDate and countdownTimer (Object)
  const countdownStorage = {
    countdownTitle: countdownTitle,
    countdownTimer: countdownTimer,
  };
  localStorage.setItem("timer", JSON.stringify(countdownStorage));
};

const restoreTimer = function () {
  //if time exists, restore
  if (JSON.parse(localStorage.getItem("timer"))) {
    const countdownStorage = JSON.parse(localStorage.getItem("timer"));
    countdownTitle = countdownStorage.countdownTitle;
    countdownTimer = countdownStorage.countdownTimer;
    showTimerContainer();
    startInterval();
  } else {
    return;
  }
};

const clearStorage = function () {
  localStorage.clear();
};

//Function upon completion of countdown
const completeCountdown = function () {
  //Show Complete Container
  countdownEl.hidden = true;
  completeContainer.hidden = false;
  //Show Complete Message
  completeInfo.innerText = `Countdown Finished on ${countdownDate}`;
  //
};

//On Load
restoreTimer();
