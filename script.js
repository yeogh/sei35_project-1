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
  document.getElementById("submit").style.visibility = "hidden";
  document.getElementById("gamebrief").style.visibility = "hidden";
  document.getElementById("startagain").style.visibility = "visible";
  document.getElementById("question").style.visibility = "visible";
  document.getElementById("countdown").style.visibility = "visible";
  resetQns();
  randomColor();
  randomNum();
  resetAnswer();
}

function hideQnShowAttempt() {
  document.getElementById("gamebrief").style.visibility = "hidden";
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
  document.getElementById("submit").style.visibility = "visible";
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
  time = 4;
  duration = 1000;
  countdown.innerText = "(Your turn in 5 secs)";
  timer();
}

document.querySelector("#startagain").addEventListener("click", newGame);

//Next Challenge
function nextChallenge() {
  hideAttemptShowQn();
  setTimeout(hideQnShowAttempt, 5000);
  time = 4;
  duration = 1000;
  countdown.innerText = "(Your turn in 5 secs)";
  timer();
}

document.querySelector("#next").addEventListener("click", nextChallenge);

//Countdown
let countdown = document.getElementById("countdown");
let time = 4;
let duration = 1000;
countdown.innerText = "(Your turn in 5 secs)";

function countdownText() {
  countdown.innerText = `(Your turn in ${time} secs)`;
  time--;
}

function timer() {
  for (let t = 0; t < 4; t++) {
    setTimeout(countdownText, duration);
    duration += 1000;
  }
}

//Challenge
let colorArr = ["red", "yellow", "blue", "green"];
let numArr = [1, 2];
let numofsq = 4;
let randomQnColorArr = [];

function randomColor() {
  for (let i = 0; i < numofsq; i++) {
    let randomColorIndex = Math.floor(Math.random() * colorArr.length);
    randomQnColorArr[i] = document.getElementsByClassName("randomqn")[i];
    // randomQnColorArr[i].innerText = colorArr[randomColorIndex];
    randomQnColorArr[i].classList.add(colorArr[randomColorIndex]);
  }
}

function randomNum() {
  for (let i = 0; i < numofsq; i++) {
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

document.querySelector("#submit").addEventListener("click", compareResultV3);

// function compareResultV2() {
//   document.getElementById("question").style.visibility = "visible";
//   document.getElementById("reset").style.visibility = "hidden";
//   document.getElementById("option").style.visibility = "hidden";
//   document.getElementById("reset").style.visibility = "hidden";
//   document.getElementById("submit").style.visibility = "hidden";
//   for (let k = 1; k < 5; k++) {
//     let ansClasses = document.getElementById(`anssq${k}`).classList;
//     if (
//       document.getElementById(`qnsquare${k}`).classList[3] ===
//         ansClasses.item(ansClasses.length - 1) &&
//       document.getElementById(`qnsquare${k}`).innerText ===
//         document.getElementById(`anssq${k}`).innerText.trim()
//     ) {
//       attemptArr.push("correct");
//     } else if (
//       document.getElementById(`qnsquare${k}`).classList[3] ===
//       ansClasses.item(ansClasses.length - 1)
//     ) {
//       attemptArr.push("correctcol");
//     } else if (
//       document.getElementById(`qnsquare${k}`).innerText ===
//       document.getElementById(`anssq${k}`).innerText.trim()
//     ) {
//       attemptArr.push("correctnum");
//     } else {
//       attemptArr.push("incorrect");
//     }

//     console.log(attemptArr);
//     console.log(attemptArr.every(checkAttempt));
//     console.log(document.getElementById(`qnsquare${k}`).innerText);
//     console.log(document.getElementById(`anssq${k}`).innerText.trim());
//   }

//   function checkAttempt(element) {
//     return element === "correct";
//   }

//   function checkAttemptCol(element) {
//     return element === "correctcol";
//   }

//   function checkAttemptNum(element) {
//     return element === "correctnum";
//   }
//   // console.log(attemptArr);
//   // console.log(attemptArr.every(checkAttempt));

//   if (attemptArr.every(checkAttempt) === true) {
//     attempt.innerText =
//       "Awesome! You've got perfect memory. Try the next challenge and make it perfect too!";
//     scoreText += 10;
//     score.innerText = `Score: ${scoreText}`;
//   } else if (attemptArr.every(checkAttemptCol) === true) {
//     attempt.innerText =
//       "Colour perfect! 5 points for that. Up your number game at the next challenge.";
//     scoreText += 5;
//     score.innerText = `Score: ${scoreText}`;
//   } else if (attemptArr.every(checkAttemptNum) === true) {
//     attempt.innerText =
//       "You are good with numbers. 5 points for that. Cant wait to see the colour match for next challenge.";
//     scoreText += 5;
//     score.innerText = `Score: ${scoreText}`;
//   } else {
//     attempt.innerText =
//       "Opps, not exactly right. Try the next challenge. You've got this!";
//   }
// }

function compareResultV3() {
  document.getElementById("question").style.visibility = "visible";
  document.getElementById("reset").style.visibility = "hidden";
  document.getElementById("option").style.visibility = "hidden";
  document.getElementById("reset").style.visibility = "hidden";
  document.getElementById("submit").style.visibility = "hidden";
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

    console.log(attemptArr);
    console.log(attemptArr.every(checkAttempt));
    console.log(document.getElementById(`qnsquare${k}`).innerText);
    console.log(document.getElementById(`anssq${k}`).innerText.trim());
  }

  function checkAttempt(element) {
    return element === "correct";
  }

  function checkAttemptCol(element) {
    // return element === "correctcol";
    return element === "correctcol" || element === "correct";
  }

  function checkAttemptNum(element) {
    // return element === "correctnum" ;
    return element === "correctnum" || element === "correct";
  }
  // console.log(attemptArr);
  // console.log(attemptArr.every(checkAttempt));

  function checkIncorrect(element) {
    // return element === "correctnum" ;
    return element === "incorrect";
  }

  if (attemptArr.every(checkAttempt) === true) {
    attempt.innerText =
      "Awesome! You've got perfect memory. Try the next challenge and make it perfect too!";
    scoreText += 10;
    score.innerText = `Score: ${scoreText}`;
  } else if (attemptArr.every(checkAttemptCol) === true) {
    attempt.innerText =
      "Colour perfect! 5 points for that. Up your number game at the next challenge.";
    scoreText += 5;
    score.innerText = `Score: ${scoreText}`;
  } else if (attemptArr.every(checkAttemptNum) === true) {
    attempt.innerText =
      "You are good with numbers. 5 points for that. Cant wait to see the colour match for next challenge.";
    scoreText += 5;
    score.innerText = `Score: ${scoreText}`;
  } else if (attemptArr.some(checkIncorrect)) {
    attempt.innerText =
      "Opps, not exactly right. Try the next challenge. You've got this!";
  }

  //   else {
  //     attempt.innerText =
  //       "Opps, not exactly right. Try the next challenge. You've got this!";
  //   }
}

//Tooltip
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

//Increase complexity
let colourList = document.getElementById("colourlist");
let numberList = document.getElementById("numberlist");

//   if (scoreText === 10) {
//     let newBlue = document.createElement("li");
//     newBlue.classList.add("colour", "blue");
//     newBlue.setAttribute("id", "dragblue");
//     newBlue.setAttribute("draggable", "true");
//     newBlue.setAttribute("ondragstart", "drag(event)");
//     newBlue.innerText = "Blue";

//     let newThree = document.createElement("li");
//     newThree.classList.add("number");
//     newThree.setAttribute("id", "dragthree");
//     newThree.setAttribute("draggable", "true");
//     newThree.setAttribute("ondragstart", "drag(event)");
//     newThree.innerText = "3";

//     colourList.appendChild(newBlue);
//     numberList.appendChild(newThree);
//     colorArr.push("blue");
//     numArr.push("3");
//   } else if (scoreText === 20) {
//     let newGreen = document.createElement("li");
//     newGreen.classList.add("colour", "green");
//     newGreen.setAttribute("id", "draggreen");
//     newGreen.setAttribute("draggable", "true");
//     newGreen.setAttribute("ondragstart", "drag(event)");
//     newGreen.innerText = "Green";

//     let newFour = document.createElement("li");
//     newFour.classList.add("number");
//     newFour.setAttribute("id", "dragfour");
//     newFour.setAttribute("draggable", "true");
//     newFour.setAttribute("ondragstart", "drag(event)");
//     newFour.innerText = "4";

//     colourList.appendChild(newGreen);
//     numberList.appendChild(newFour);
//     colorArr.push("green");
//     numArr.push("4");
//   }
