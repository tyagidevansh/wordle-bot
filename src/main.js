const ANSWER = "CAADS";
let wordList = null;
let focusedIdx = 0;

let inputs = null;
let keys = null;

let canMakeGuesses = true;

let greenChar = ['', '', '', '', ''];
let yellowChar = [];
let grayChar = [];

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
      wordList = wordList[0];
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

const handleBackspaceAndEnter = (event = null, key = null) => {
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
      greenChar[i] = answer[i];
      if (yellowChar.includes(answer[i])) {
        let idx = yellowChar.indexOf(answer[i]);
        yellowChar.splice(idx, 1);
      }
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
    let tempYellowChar = [];
    for (j = 0; j < 5; j++) {
      if (i == j) continue;
      let answerChar = answer[j];

      if (guessChar === answerChar) {
        colors[i] = "yellow";
        tempYellowChar.push(guess[i]);
        answer[j] = "x"; // this character (lowercase) will never occur in the answer so im using it to ensure no character is counted twice
      }
    }
    for (idx = 0; idx < tempYellowChar.length; idx++) {
      let curChar = tempYellowChar[idx];
      if (!yellowChar.includes(curChar)) {
        yellowChar.push(curChar);
        break;
      }

      let numOccurences = 1;
      for (idx2 = idx + 1; idx2 < tempYellowChar.length; idx2++) {
        if (curChar === tempYellowChar[idx2]) {
          numOccurences++;
          tempYellowChar[idx2] = 'x';
        }
      }

      for (idx3 = 0; idx3 < grayChar.length; idx3++) {
        if (greenChar[idx3] === curChar) numOccurences--;
      }

      for (idx3 = 0; idx3 < yellowChar.length; idx3++) {
        if (yellowChar[idx3] === curChar) numOccurences--;
      }

      for (idx4 = numOccurences; idx4 > 0; i++) {
        yellowChar.push(curChar);
      }
    }
    if (colors[i] == "gray" && !grayChar.includes(guess[i])) {
      grayChar.push(guess[i]);
    }
  }
  
  console.log(greenChar);
  console.log(yellowChar);
  console.log(grayChar);

  for (i = 0; i < 5; i++) {
    setTimeout(updateStyle, 500 * i, form[i], colors[i]);
  }
  guess = guess.map((item) => item.toLowerCase());
  findValidGuesses(guess, colors);
};

const updateStyle = (cell, color) => {
  cell.classList.add(`flip-${color}`);
  const key = document.getElementById(cell.value);
  key.classList.remove("bg-[#818384]");
  if (color == "green") {
    key.classList.add("bg-[#5a9a54]");
    key.classList.remove("bg-[#b59f3b]");
  } else if (color == "yellow" && !key.classList.contains("bg-[#5a9a54]")) {
    key.classList.add("bg-[#b59f3b]");
  } else if (
    !key.classList.contains("bg-[#5a9a54]") &&
    !key.classList.contains("bg-[#b59f3b]")
  ) {
    key.classList.add("bg-[#3a3a3c]");
  }
};

const findValidGuesses = (guess, colors) => {
  if (!wordList || wordList.length == 0) return null;
  
  // for (i = 0; i < 5; i++) {
  //   if (greenChar[i] != "") {
  //     let k = 0;
  //     while (k < wordList.length) {
  //       if (wordList[k][i] != greenChar[i]) {
  //         wordList.splice(i, 1);
  //       } else k++;
  //     }
  //   }
  // }

  // while (i < wordList.length) {
  //   let word = wordList[i];
  //   for (j = 0; j < 5; j++) {
  //     if (colors[j] === "gray") {
  //       let k = 0;
  //       if (!removedLetters.includes(guess[j])) {
  //         while (k < wordList.length) {
  //           if (wordList[k].includes(guess[j])) {
  //             wordList.splice(k, 1);
  //           } else {
  //             k++;
  //           }
  //         }
  //         removedLetters.push(guess[j]);
  //       }
  //     } else {
  //       if (!existingLetters.includes(guess[j])) {
  //         existingLetters.push(guess[j]);
  //       }
  //     }
  //   }

  //   // for (j = 0; j < 5; j++) {
  //   //   if (colors[j] === "green") {
  //   //     if (word[j] != guess[j]) {
  //   //       wordList.splice(i, 1);
  //   //       i--;
  //   //       break;
  //   //     }
  //   //   }
  //   // }

  //   //   // if (colors[j] == "yellow") {
  //   //   //   let oneMatch = false;
  //   //   //   for (k = 0; k < 5; k++) {
  //   //   //     if (word[k] == guess[j]) {
  //   //   //       word[k] = 'x';
  //   //   //       oneMatch = true;
  //   //   //     }
  //   //   //   }
  //   //   // }
  //   // }
  //   i++;
  // }
  // wordList = newWordList;
  // console.log(wordList);
  const validGuessDisplay = document.getElementById("right");
  validGuessDisplay.textContent = wordList.join(" ");
};
