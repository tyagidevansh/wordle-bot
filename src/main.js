const ANSWER = "CARDS";
let wordList = null;
let focusedIdx = 0;

let inputs = null;
let keys = null;

let canMakeGuesses = true;

document.addEventListener("DOMContentLoaded", () => {
  fetch("valid-wordle-words.txt")
    .then((response) => {
      if (!response.ok) {
        console.log("couldnt read file");
        return;
      }
      return response.text();
    })
    .then((data) => {
      wordList = [data.split("\n")];
    });

  inputs = document.querySelectorAll('input[maxlength="1"]');
  keys = document.querySelectorAll(".key");

  inputs.forEach((input) => {
    input.value = "";
  });

  inputs[0].focus();
  inputs.forEach((input) => {
    input.addEventListener("input", () => handleInputField(input));

    input.addEventListener("keydown", (event) =>
      handleBackspaceAndEnter(event)
    );
  });

  keys.forEach((key) => {
    key.addEventListener("click", () => handleOnScreenKey(key));
  });
});

const handleInputField = (input) => {
  let curIdx = -1;

  for (i = 0; i < 30; i++) {
    if (inputs[i] == input) {
      curIdx = i;
      if (curIdx != focusedIdx) {
        input.value = "";
        return;
      }
    }
  }

  input.value = input.value.toUpperCase();
  if (input.value < "A" || input.value > "Z") {
    input.value = "";
  } else {
    if ((curIdx + 1) % 5 == 0) {
      // do nothing
    } else if (input.value.length == 1) {
      inputs[curIdx + 1].focus();
      focusedIdx = curIdx + 1;
    }
  }
};

const handleOnScreenKey = (key) => {
  let curIdx = focusedIdx;

  if (curIdx == 0 || curIdx % 5 != 0) {
    if (key.textContent != "Enter" && key.textContent != "⌫") {
      inputs[curIdx].value = key.textContent;
      focusedIdx = curIdx + 1;
      inputs[curIdx + 1].focus();
    }
  } else {
    // cellotape ahh solution
    focusedIdx = curIdx - 1;
    inputs[curIdx - 1].focus();
    if (key.textContent == "Enter") {
      handleBackspaceAndEnter("Enter");
    }
    if (key.textContent == "⌫") {
      handleBackspaceAndEnter("Backspace");
    }
  }
};

const handleBackspaceAndEnter = (event = null, key=null) => {
  let curIdx = focusedIdx;

  if (event.key == "Backspace" || key == "Backspace") {
    event.preventDefault();
    inputs[focusedIdx].value = "";
    if (focusedIdx % 5 != 0) {
      focusedIdx = curIdx - 1;
      inputs[focusedIdx].focus();
    }
  }

  if ((event.key == "Enter" || key == "Enter") && (focusedIdx + 1) % 5 == 0) {
    handleSubmit();
  }
};

const handleSubmit = () => {
  let input = inputs[focusedIdx];
  let form = input.form;

  let value = [];

  for (i = 0; i < form.length; i++) {
    value.push(form[i].value);
  }

  checkGuess(form, value);
  if (canMakeGuesses) {
    inputs[focusedIdx + 1].focus();
    focusedIdx = focusedIdx + 1;
  }
};

const checkGuess = (form, guess) => {
  let colors = ["gray", "gray", "gray", "gray", "gray"];
  let answer = ANSWER.split("");
  let correct = 0;

  for (i = 0; i < 5; i++) {
    let guessChar = guess[i];
    let answerChar = answer[i];

    if (guessChar == answerChar) {
      correct++;
      colors[i] = "green";
      answer[i] = "x";

      // let idx = answer.charCodeAt(i);
      // letterColors[idx] = "green";
    }
  }

  if (correct == 5) {
    canMakeGuesses = false;
  }

  for (i = 0; i < 5; i++) {
    if (colors[i] == "green") continue;

    let guessChar = guess[i];

    for (j = 0; j < 5; j++) {
      if (i == j) continue;
      let answerChar = answer[j];

      if (guessChar === answerChar) {
        colors[i] = "yellow";
        answer[j] = "x"; // this character (lowercase) will never occur in the answer so im using it to ensure no character is counted twice
      }
    }
  }

  for (i = 0; i < 5; i++) {
    setTimeout(updateStyle, 500 * i, form[i], colors[i]);
  }

  // findValidGuesses(ANSWER);
};

const updateStyle = (cell, color) => {
  cell.classList.add(`flip-${color}`);
};
