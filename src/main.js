const ANSWER = "PICKY";
let wordList = null;
let focusedIdx = 0;

let inputs = null;
let keys = null;

let canMakeGuesses = true;

let greenChar = ["", "", "", "", ""];
let yellowChar = [];
let grayChar = [];

permutations = ['GGGGG', 'GGGGB',  'GGGYY', 'GGGYB', 'GGGBG', 'GGGBY', 'GGGBB', 'GGYGY', 'GGYGB', 'GGYYG', 'GGYYY', 'GGYYB', 'GGYBG', 'GGYBY', 'GGYBB', 'GGBGG', 'GGBGY', 'GGBGB', 'GGBYG', 'GGBYY', 'GGBYB', 'GGBBG', 'GGBBY', 'GGBBB', 'GYGGY', 'GYGGB', 'GYGYG', 'GYGYY', 'GYGYB', 'GYGBG', 'GYGBY', 'GYGBB', 'GYYGG', 'GYYGY', 'GYYGB', 'GYYYG', 'GYYYY', 'GYYYB', 'GYYBG', 'GYYBY', 'GYYBB', 'GYBGG', 'GYBGY', 'GYBGB', 'GYBYG', 'GYBYY', 'GYBYB', 'GYBBG', 'GYBBY', 'GYBBB', 'GBGGG', 'GBGGY', 'GBGGB', 'GBGYG', 'GBGYY', 'GBGYB', 'GBGBG', 'GBGBY', 'GBGBB', 'GBYGG', 'GBYGY', 'GBYGB', 'GBYYG', 'GBYYY', 'GBYYB', 'GBYBG', 'GBYBY', 'GBYBB', 'GBBGG', 'GBBGY', 'GBBGB', 'GBBYG', 'GBBYY', 'GBBYB', 'GBBBG', 'GBBBY', 'GBBBB', 'YGGGY', 'YGGGB', 'YGGYG', 'YGGYY', 'YGGYB', 'YGGBG', 'YGGBY', 'YGGBB', 'YGYGG', 'YGYGY', 'YGYGB', 'YGYYG', 'YGYYY', 'YGYYB', 'YGYBG', 'YGYBY', 'YGYBB', 'YGBGG', 'YGBGY', 'YGBGB', 'YGBYG', 'YGBYY', 'YGBYB', 'YGBBG', 'YGBBY', 'YGBBB', 'YYGGG', 'YYGGY', 'YYGGB', 'YYGYG', 'YYGYY', 'YYGYB', 'YYGBG', 'YYGBY', 'YYGBB', 'YYYGG', 'YYYGY', 'YYYGB', 'YYYYG', 'YYYYY', 'YYYYB', 'YYYBG', 'YYYBY', 'YYYBB', 'YYBGG', 'YYBGY', 'YYBGB', 'YYBYG', 'YYBYY', 'YYBYB', 'YYBBG', 'YYBBY', 'YYBBB', 'YBGGG', 'YBGGY', 'YBGGB', 'YBGYG', 'YBGYY', 'YBGYB', 'YBGBG', 'YBGBY', 'YBGBB', 'YBYGG', 'YBYGY', 'YBYGB', 'YBYYG', 'YBYYY', 'YBYYB', 'YBYBG', 'YBYBY', 'YBYBB', 'YBBGG', 'YBBGY', 'YBBGB', 'YBBYG', 'YBBYY', 'YBBYB', 'YBBBG', 'YBBBY', 'YBBBB', 'BGGGG', 'BGGGY', 'BGGGB', 'BGGYG', 'BGGYY', 'BGGYB', 'BGGBG', 'BGGBY', 'BGGBB', 'BGYGG', 'BGYGY', 'BGYGB', 'BGYYG', 'BGYYY', 'BGYYB', 'BGYBG', 'BGYBY', 'BGYBB', 'BGBGG', 'BGBGY', 'BGBGB', 'BGBYG', 'BGBYY', 'BGBYB', 'BGBBG', 'BGBBY', 'BGBBB', 'BYGGG', 'BYGGY', 'BYGGB', 'BYGYG', 'BYGYY', 'BYGYB', 'BYGBG', 'BYGBY', 'BYGBB', 'BYYGG', 'BYYGY', 'BYYGB', 'BYYYG', 'BYYYY', 'BYYYB', 'BYYBG', 'BYYBY', 'BYYBB', 'BYBGG', 'BYBGY', 'BYBGB', 'BYBYG', 'BYBYY', 'BYBYB', 'BYBBG', 'BYBBY', 'BYBBB', 'BBGGG', 'BBGGY', 'BBGGB', 'BBGYG', 'BBGYY', 'BBGYB', 'BBGBG', 'BBGBY', 'BBGBB', 'BBYGG', 'BBYGY', 'BBYGB', 'BBYYG', 'BBYYY', 'BBYYB', 'BBYBG', 'BBYBY', 'BBYBB', 'BBBGG', 'BBBGY', 'BBBGB', 'BBBYG', 'BBBYY', 'BBBYB', 'BBBBG', 'BBBBY', 'BBBBB']
let totalWords = null;

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
      totalWords = wordList.length;
      console.log("Best starting word: " + calculateWordFrequencies(wordList));
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
      greenChar[i] = answer[i].toLowerCase();
      if (yellowChar.includes(answer[i].toLowerCase())) {
        let idx = yellowChar.indexOf(answer[i].toLowerCase());
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
        yellowChar.push(curChar.toLowerCase());
        break;
      }

      let numOccurences = 1;
      for (idx2 = idx + 1; idx2 < tempYellowChar.length; idx2++) {
        if (curChar === tempYellowChar[idx2]) {
          numOccurences++;
          tempYellowChar[idx2] = "x";
        }
      }

      for (idx3 = 0; idx3 < grayChar.length; idx3++) {
        if (greenChar[idx3] === curChar) numOccurences--;
      }

      for (idx3 = 0; idx3 < yellowChar.length; idx3++) {
        if (yellowChar[idx3] === curChar) numOccurences--;
      }

      for (idx4 = numOccurences; idx4 > 0; i++) {
        yellowChar.push(curChar.toLowerCase());
      }
    }
    if (colors[i] == "gray" && !grayChar.includes(guess[i])) {
      grayChar.push(guess[i].toLowerCase());
    }
  }

  console.log(greenChar);
  console.log(yellowChar);
  console.log(grayChar);

  for (i = 0; i < 5; i++) {
    setTimeout(updateStyle, 500 * i, form[i], colors[i]);
  }
  guess = guess.map((item) => item.toLowerCase());
  let guessInList = wordList.indexOf(guess.join(""));
  if (guessInList >= 0) wordList.splice(guessInList, 1);
  findValidGuesses();
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


const findValidGuesses = () => {
  if (!wordList || wordList.length == 0) return null;

  for (i = 0; i < 5; i++) {
    if (greenChar[i] != "") {
      let k = 0;
      while (k < wordList.length) {
        let word = wordList[k];
        if (word[i] != greenChar[i]) {
          wordList.splice(k, 1);
        } else k++;
      }
    }
  }

  for (i = 0; i < yellowChar.length; i++) {
    let k = 0;
    while (k < wordList.length) {
      let word = wordList[k];
      let exists = false;
      for (j = 0; j < 5; j++) {
        if (word[j] == yellowChar[i] && word[j] != greenChar[i]) {
          exists = true;
        }
      }
      if (!exists) wordList.splice(k, 1);
      else k++;
    }
  }

  for (i = 0; i < grayChar.length; i++) {
    let k = 0;
    let allowedExistence = 0;

    for (j = 0; j < 5; j++) {
      if (greenChar[j] == grayChar[i]) allowedExistence++;
    }

    for (j = 0; j < yellowChar.length; j++) {
      if (yellowChar[j] == grayChar[i]) allowedExistence++;
    }

    console.log(allowedExistence, grayChar[i]);
    while (k < wordList.length) {
      let word = wordList[k];
      let occurence = 0;

      for (j = 0; j < 5; j++) {
        if (word[j] == grayChar[i]) {
          occurence++;
        }
      }

      if (occurence > allowedExistence) wordList.splice(k, 1);
      else k++;
    }
  }
  wordList = calculateWordFrequencies(wordList);
  const validGuessDisplay = document.getElementById("right");
  validGuessDisplay.textContent = wordList.join(" ");
};

const filterWords = (word, wordList, pattern) => {
  let i = 0;
  while (i < wordList.length) {

    for (j = 0; j < 5; j++) {
      if (pattern[j] === 'G') {
        if (wordList[i][j] != word[j]) {
          wordList.splice(i, 1);
        } else i++;
      }
    }

    for (j = 0; j < 5; j++) {
      if (pattern[j] === 'Y') {
        if (wordList[i][j] == word[j] || !wordList[i].includes(word[j])) {
          wordList.splice(i, 1);
        } else i++;
      }
    }

    for (j = 0; j < 5; j++) {
      if (pattern[j] === 'B') {
        let totalOccurencesInWord = 0;
        let totalOccurencesInGuess = 0;

        for (k = 0; k < 5; k++) {
          if (word[k] == word[j]) totalOccurencesInGuess++;
          if (wordList[i][k] == word[j]) totalOccurencesInWord++;
        }

        if (totalOccurencesInWord > totalOccurencesInGuess) {
          wordList.splice(i, 1);
        } else i++;
      }
    }
  } 
  console.log("Filtered word list for word " + word + " with pattern " + pattern + ": " + wordList);
  return wordList;
}

// compute entropy for all words (probably calculate them once and store em)
// choose the word with the higest entropy
// make a guess and update list of possible words
// repeat (can i get away with calculating entropy only once?)

const calculateEntropy = () => {
  if (!wordList || !totalWords) {
    return;
  }
  console.log("Calculating entropy...");

  for (i = 0; i < wordList.length; i++) {
    let totalOccurences = 0;
    let word = wordList[i];
    // filter the words for each pattern and count
    for (j = 0; j < permutations.length; i++) {
      console.log("Checking word: " + word + " with pattern: " + permutations[j]);
      let wordListCopy = wordList;
      wordListCopy.splice(i, 1); // remove current word
      filterWords(word, wordListCopy, permutations[j]);
      totalOccurences += wordListCopy.length;
      console.log(totalOccurences);
    }
  }
  
  // find the word with the highest entropy
  let maxEntropy = 0;
  let bestWord = null;

  for (i = 0; i < wordList.length; i++) {
    let word = wordList[i];
    let entropy = 0;

    for (j = 0; j < permutations.length; j++) {
      let wordListCopy = wordList.slice();
      wordListCopy.splice(i, 1); // remove current word
      filterWords(word, wordListCopy, permutations[j]);
      entropy += wordListCopy.length;
    }

    if (entropy > maxEntropy) {
      maxEntropy = entropy;
      bestWord = word;
    }
  }

  return bestWord;
}

const calculateWordFrequencies = (wordList) => {
  if (!wordList) return;

  let letterFrequencies = {};

  for (i = 0; i < wordList.length; i++) {
    let word = wordList[i];

    word.split("").forEach((letter) => {
      if (letter in letterFrequencies) {
        letterFrequencies[letter] += 1;
      } else {
        letterFrequencies[letter] = 1;
      }
    });
  }

  let wordScores = {};

  for (i = 0; i < wordList.length; i++) {
    let word = wordList[i];
    let uniqueLetters = new Set(word);
    let score = 0;

    uniqueLetters.forEach((letter) => {
      score += letterFrequencies[letter];
    });

    wordScores[word] = score;
  }

  let sortable = [];
  for (let word in wordScores) {
    sortable.push([word, wordScores[word]]);
  }

  sortable.sort((a, b) => b[1] - a[1]);
  console.log("Word scores: ", sortable.slice(0, 10));

  return sortable.map(innerArray => innerArray[0]);
}