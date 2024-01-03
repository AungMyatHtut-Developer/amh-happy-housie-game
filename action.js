let calledNumbers = [];
let isGameRunning = false;
let intervalId;

function startGame() {
  playButtonSound();
  if (!isGameRunning) {
    isGameRunning = true;
    playCountDownSound();
    intervalId = setInterval(callNumber, getDelayTime() * 1000);
  }
}

function stopGame() {
  playButtonSound();
  if (isGameRunning) {
    clearInterval(intervalId);
    isGameRunning = false;
  }
}

function resumeGame() {
  playButtonSound();
  if (!isGameRunning) {
    isGameRunning = true;
    intervalId = setInterval(callNumber, getDelayTime() * 1000);
  }
}

function resetGame() {
  playButtonSound();
  stopGame();
  calledNumbers = [];
  resetTable();
}

function callNumber() {
  playWarningSound();

  setTimeout(function () {
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * 75) + 1;
    } while (calledNumbers.includes(randomNumber));

    speakNumber(randomNumber);

    calledNumbers.push(randomNumber);

    document.getElementById("random-number").innerHTML = randomNumber;
    if (randomNumber > 10) {
      document.getElementById("random-number").classList.add("span-number");
    } else {
      document.getElementById("random-number").classList.remove("span-number");
    }

    // Update the called numbers list
    updateCalledNumbers(randomNumber);

    // Highlight the called number in the table
    highlightNumber(randomNumber);
  }, 2000);
}

function updateCalledNumbers(calledNumber) {
  // Update the called numbers list
  console.log("Called Number: " + calledNumber);
}

function highlightNumber(number) {
  // Highlight the called number in the table
  let cell = document.getElementById(`number-${number}`);
  if (cell) {
    cell.classList.add("highlight");
  }
}

function resetTable() {
  // Reset the background color of all cells in the table
  let cells = document.querySelectorAll("td");
  cells.forEach((cell) => {
    cell.classList.remove("highlight");
  });

  document.getElementById("random-number").innerHTML = "Start Game";
}

function getDelayTime() {
  return parseInt(document.getElementById("delayTime").value, 10) || 5;
}

function playWarningSound() {
  // Create a new Audio object each time
  let audio = new Audio("game-voice.mp3"); // replace 'warning.mp3' with your audio file

  audio.play();
}

function playCountDownSound() {
  // Create a new Audio object each time
  let audio = new Audio("countdown.wav"); // replace 'warning.mp3' with your audio file
  audio.play();
}

function speakNumber(number) {
  // Use Speech Synthesis API to speak out the number
  let utterance = new SpeechSynthesisUtterance(number.toString());
  window.speechSynthesis.speak(utterance);
}

function playButtonSound(){
    // Create a new Audio object each time
    let audio = new Audio("button-click.wav"); // replace 'warning.mp3' with your audio file
    audio.play();
}
