//Function to Control Content
function initialView() {
  document.getElementById("guess").style.visibility = "hidden";
  document.getElementById("option").style.visibility = "hidden";
  document.getElementById("buttons-bottom").style.visibility = "hidden";
  document.getElementById("question").style.visibility = "hidden";
  document.getElementById("result").style.visibility = "hidden";
  document.getElementById("level").style.visibility = "hidden";
  document.getElementById("next").style.visibility = "hidden";
  document.getElementById("startagain").style.visibility = "hidden";
}

function hideAttemptShowQn() {
  document.getElementById("guess").style.visibility = "hidden";
  document.getElementById("option").style.visibility = "hidden";
  document.getElementById("buttons-bottom").style.visibility = "hidden";
  document.getElementById("reset").style.visibility = "hidden";
  document.getElementById("result").style.visibility = "hidden";
  document.getElementById("level").style.visibility = "hidden";
  document.getElementById("next").style.visibility = "hidden";
  document.getElementById("startagain-initial").style.visibility = "hidden";
  document.getElementById("startagain").style.visibility = "visible";
  document.getElementById("question").style.visibility = "visible";
  document.getElementById("countdown").style.visibility = "visible";
  resetQns();
  randomColor();
  randomNum();
  resetAnswer();
}

function hideQnShowAttempt() {
  document.getElementById("startagain-initial").style.visibility = "hidden";
  document.getElementById("question").style.visibility = "hidden";
  document.getElementById("countdown").style.visibility = "hidden";
  document.getElementById("guess").style.visibility = "visible";
  document.getElementById("option").style.visibility = "visible";
  document.getElementById("buttons-bottom").style.visibility = "visible";
  document.getElementById("result").style.visibility = "visible";
  document.getElementById("level").style.visibility = "visible";
  document.getElementById("next").style.visibility = "visible";
  document.getElementById("startagain").style.visibility = "visible";
  document.getElementById("reset").style.visibility = "visible";
}

//On Windows Load
window.addEventListener("load", initialView);

document
  .querySelector("#startagain-initial")
  .addEventListener("click", newGame);

//New Game
function newGame() {
  hideAttemptShowQn();
  setTimeout(hideQnShowAttempt, 5000);
  scoreText = 0;
  score.innerText = `Score: ${scoreText}`;
  timer();
}

document.querySelector("#startagain").addEventListener("click", newGame);

//Next Challenge
function nextChallenge() {
  hideAttemptShowQn();
  setTimeout(hideQnShowAttempt, 5000);
}

document.querySelector("#next").addEventListener("click", nextChallenge);

//Countdown
let countdown = document.getElementById("countdown");
let time = 5;
let duration = 0;
countdown.innerText = "(Your turn in 5 secs)";

function timer() {
  for (let t = 0; t < time; t++) {
    duration += 1000;
    time--;
    setTimeout(countdownText, duration);
  }
}

function countdownText() {
  countdown.innerText = `(Your turn in ${time} secs)`;
}

//Challenge
let colorArr = ["red", "yellow", "blue", "green"];
let numArr = [1, 2];

let randomQnColorArr = [];

function randomColor() {
  for (let i = 0; i < 4; i++) {
    let randomColorIndex = Math.floor(Math.random() * colorArr.length);
    randomQnColorArr[i] = document.getElementsByClassName("randomqn")[i];
    randomQnColorArr[i].innerText = colorArr[randomColorIndex];
    randomQnColorArr[i].classList.add(colorArr[randomColorIndex]);
  }
}

function randomNum() {
  for (let i = 0; i < 4; i++) {
    let randomNumIndex = Math.floor(Math.random() * numArr.length);
    randomQnColorArr[i] = document.getElementsByClassName("randomqn")[i];
    randomQnColorArr[i].innerText = numArr[randomNumIndex];
    // randomQnColorArr[i].classList.add(numArr[randomNumIndex]);
  }
}

//Drag and drop reference https://jsfiddle.net/dzsk7311/4/
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  //   console.log(JSON.stringify(data));
  let nodeCopy = document.getElementById(data).cloneNode(true);
  if (nodeCopy.classList[0] === "colour") {
    ev.target.classList.add(nodeCopy.classList[1]);
  } else if (nodeCopy.classList[0] === "number") {
    ev.target.innerText = nodeCopy.innerText;
  }
  ev.stopPropagation();
  return false;
}

// Reset Questions
const randomQns = document.getElementsByClassName("randomqn");

function resetQns() {
  for (let j = 0; j < randomQns.length; j++) {
    randomQns[j].innerText = "";
    randomQns[j].classList.remove("red", "yellow", "blue", "green");
  }
  document.getElementById("result").innerText = "";
}

// Reset Answers
const answers = document.getElementsByClassName("answer");

function resetAnswer() {
  for (let j = 0; j < answers.length; j++) {
    answers[j].innerText = "";
    answers[j].classList.remove("red", "yellow", "blue", "green");
  }
  document.getElementById("result").innerText = "";
  attemptArr.length = 0;
}

document.querySelector("#reset").addEventListener("click", resetAnswer);

//Score
let score = document.getElementById("level");
let scoreText = 0;
score.innerText = `Score: ${scoreText}`;

//Verify Result
let attempt = document.querySelector("#result");
let attemptArr = [];

function compareResult() {
  document.getElementById("question").style.visibility = "visible";
  document.getElementById("reset").style.visibility = "hidden";
  for (let k = 1; k < 5; k++) {
    let ansClasses = document.getElementById(`anssq${k}`).classList;
    if (
      document.getElementById(`qnsquare${k}`).classList[3] ===
        ansClasses.item(ansClasses.length - 1) &&
      document.getElementById(`qnsquare${k}`).innerText ===
        document.getElementById(`anssq${k}`).innerText.trim()
    ) {
      attemptArr.push("correct");
    } else {
      attemptArr.push("incorrect");
    }
  }
  function checkAttempt(element) {
    return element === "correct";
  }
  console.log(attemptArr);
  console.log(attemptArr.every(checkAttempt));

  if (attemptArr.every(checkAttempt) === true) {
    attempt.innerText =
      "Awesome! That's perfect memory. Go try the next challenge.";
    scoreText += 10;
    score.innerText = `Score: ${scoreText}`;
    // return { attempt, scoreText };
  } else {
    attempt.innerText =
      "Opps, not exactly right. Try the next challenge. You've got this!";
    // return attempt;
  }
}

document.querySelector("#submit").addEventListener("click", compareResultV2);

function compareResultV2() {
  document.getElementById("question").style.visibility = "visible";
  document.getElementById("reset").style.visibility = "hidden";
  for (let k = 1; k < 5; k++) {
    let ansClasses = document.getElementById(`anssq${k}`).classList;
    if (
      document.getElementById(`qnsquare${k}`).classList[3] ===
        ansClasses.item(ansClasses.length - 1) &&
      document.getElementById(`qnsquare${k}`).innerText ===
        document.getElementById(`anssq${k}`).innerText.trim()
    ) {
      attemptArr.push("correct");
    } else if (
      document.getElementById(`qnsquare${k}`).classList[3] ===
      ansClasses.item(ansClasses.length - 1)
    ) {
      attemptArr.push("correctcol");
    } else if (
      document.getElementById(`qnsquare${k}`).innerText ===
      document.getElementById(`anssq${k}`).innerText.trim()
    ) {
      attemptArr.push("correctnum");
    } else {
      attemptArr.push("incorrect");
    }
  }

  function checkAttempt(element) {
    return element === "correct";
  }

  function checkAttemptCol(element) {
    return element === "correctcol";
  }

  function checkAttemptNum(element) {
    return element === "correctnum";
  }
  // console.log(attemptArr);
  // console.log(attemptArr.every(checkAttempt));

  if (attemptArr.every(checkAttempt) === true) {
    attempt.innerText =
      "Awesome! That's perfect memory. Go try the next challenge.";
    scoreText += 10;
    score.innerText = `Score: ${scoreText}`;
    // return { attempt, scoreText };
  } else if (attemptArr.every(checkAttemptCol) === true) {
    attempt.innerText =
      "Colour perfect! 5 points for that. Just abit more to go for next challenge";
    scoreText += 5;
    score.innerText = `Score: ${scoreText}`;
  } else if (attemptArr.every(checkAttemptNum) === true) {
    attempt.innerText =
      "You are good with numbers. 5 points for that.Cant wait to see the colour match for next challenge";
    scoreText += 5;
    score.innerText = `Score: ${scoreText}`;
  } else {
    attempt.innerText =
      "Opps, not exactly right. Try the next challenge. You've got this!";
    // return attempt;
  }
}

// document.querySelector("#submit").addEventListener("click", compareResult);

//Tooltip
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});
