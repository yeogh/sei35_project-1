let colorArr = ["red", "yellow", "blue", "green"];
let numArr = [1, 2];

let randomQnColorArr = [];

function hideAttemptShowQn() {
  document.getElementById("guess").style.visibility = "hidden";
  document.getElementById("option").style.visibility = "hidden";
  document.getElementById("buttons").style.visibility = "hidden";
  document.getElementById("question").style.visibility = "visible";
}

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
    randomQnColorArr[i].classList.add(numArr[randomNumIndex]);
  }
}

function hideQnShowAttempt() {
  document.getElementById("guess").style.visibility = "visible";
  document.getElementById("option").style.visibility = "visible";
  document.getElementById("buttons").style.visibility = "visible";
  document.getElementById("question").style.visibility = "hidden";
}

// hideAttemptShowQn();
randomColor();
randomNum();
// hideQnShowAttempt();

//Drag and drop reference https://jsfiddle.net/dzsk7311/4/
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function removeNode(node) {
  node.parentNode.removeChild(node);
}

function drop(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  let isOptionNum =
    "dragone" == data ||
    "dragtwo" == data ||
    "dragred" == data ||
    "dragyellow" == data ||
    "dragblue" == data ||
    "draggreen" == data;
  //   let isOptionCol =
  //     "dragred" == data ||
  //     "dragyellow" == data ||
  //     "dragblue" == data ||
  //     "draggreen" == data;
  let nodeCopy = document.getElementById(data).cloneNode(true);

  ev.target.appendChild(nodeCopy);
  //   if (isOptionNum) {
  //     if (ev.target.nodeName == "li") {
  //       ev.target.parentNode.appendChild(nodeCopy);
  //       removeNode(ev.target);
  //     } else ev.target.appendChild(nodeCopy);
  //   } else {
  //     if (ev.target.nodeName != "li") {
  //       removeNode(document.getElementById(data));
  //       ev.target.appendChild(nodeCopy);
  //     }
  //   }
  //   if (isOptionCol) {
  //     if (ev.target.nodeName == "li") {
  //       ev.target.parentNode.appendChild(nodeCopy);
  //       removeNode(ev.target);
  //     } else ev.target.appendChild(nodeCopy);
  //   } else {
  //     if (ev.target.nodeName != "li") {
  //       removeNode(document.getElementById(data));
  //       ev.target.appendChild(nodeCopy);
  //     }
  ev.stopPropagation();
  return false;
}
// }
