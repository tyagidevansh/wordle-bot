let ANSWER = null;
let wordList = null;
let focusedIdx = 0;

let inputs = null;
let keys = null;

let canMakeGuesses = true;

let greenChar = ["", "", "", "", ""];
let yellowChar = [];
let yellowPositions = {};
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
      
      wordList = calculateWordFrequencies(wordList);

      const validGuessDisplay = document.getElementById("right");
      const displayText = "tares rales lares rates ranes nares teras aeros reais tears soare sater reals saner arles toeas laers aloes reans seria lears serai earls seral aeons nears earns arets taser tarse strae raise laser ranse stoae snare stare resat aesir arose aisle stear reast arise earst alose neosa aster anise isnae";
      console.log(displayText);
      validGuessDisplay.textContent = displayText;

      const randomIdx = Math.floor(Math.random() * wordList.length);
      ANSWER = wordList[randomIdx].toUpperCase();
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

        const lowerChar = guess[i].toLowerCase();
        if (!yellowPositions[lowerChar]) {
          yellowPositions[lowerChar] = [];
        }
        if (!yellowPositions[lowerChar].includes(i)) {
          yellowPositions[lowerChar].push(i);
        }
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

const isWordValid = (word, greens, yellows, grays, yellowPositions = {}) => {
  for (let i = 0; i < 5; i++) {
    if (greens[i] && word[i] !== greens[i]) {
      return false;
    }
  }

  for (let yellowLetter of yellows) {
    let foundInValidPosition = false;
    for (let i = 0; i < 5; i++) {
      if (greens[i] === yellowLetter) continue;
      if (
        yellowPositions[yellowLetter] &&
        yellowPositions[yellowLetter].includes(i)
      )
        continue;
      if (word[i] === yellowLetter) {
        foundInValidPosition = true;
        break;
      }
    }
    if (!foundInValidPosition) {
      return false;
    }
  }

  for (let grayLetter of grays) {
    let allowedCount = 0;

    for (let i = 0; i < 5; i++) {
      if (greens[i] === grayLetter) allowedCount++;
    }

    for (let yellowLetter of yellows) {
      if (yellowLetter === grayLetter) allowedCount++;
    }

    let actualCount = 0;
    for (let i = 0; i < 5; i++) {
      if (word[i] === grayLetter) actualCount++;
    }

    if (actualCount > allowedCount) {
      return false;
    }
  }

  return true;
};

const filterWordList = (
  words,
  greens,
  yellows,
  grays,
  yellowPositions = {}
) => {
  return words.filter((word) =>
    isWordValid(word, greens, yellows, grays, yellowPositions)
  );
};

const findValidGuesses = () => {
  if (!wordList || wordList.length == 0) return null;

  const filtered = filterWordList(
    wordList,
    greenChar,
    yellowChar,
    grayChar,
    yellowPositions
  );

  const sorted = calculateWordFrequencies(filtered);

  const topEntropyWords = calculateEntropy(sorted, 20);

  const validGuessDisplay = document.getElementById("right");

  const displayText = topEntropyWords.map((item) => item.word).join(" ");

  validGuessDisplay.textContent = displayText;

  wordList = sorted;
};

const patternToConstraints = (guessWord, pattern) => {
  const greens = ["", "", "", "", ""];
  const yellows = [];
  const grays = [];
  const yellowPositions = {};

  for (let i = 0; i < 5; i++) {
    if (pattern[i] === "G") {
      greens[i] = guessWord[i];
    }
  }

  for (let i = 0; i < 5; i++) {
    const letter = guessWord[i];

    if (pattern[i] === "Y") {
      if (!yellows.includes(letter)) {
        yellows.push(letter);
        yellowPositions[letter] = [i];
      } else {
        yellowPositions[letter].push(i);
      }
    } else if (pattern[i] === "B") {
      let isGreenOrYellow = false;
      for (let j = 0; j < 5; j++) {
        if (
          guessWord[j] === letter &&
          (pattern[j] === "G" || pattern[j] === "Y")
        ) {
          isGreenOrYellow = true;
          break;
        }
      }
      if (!isGreenOrYellow && !grays.includes(letter)) {
        grays.push(letter);
      }
    }
  }

  return { greens, yellows, grays, yellowPositions };
};


const calculateEntropy = (candidateWords = null, maxWords = 20) => {
  const words = candidateWords || wordList;

  if (!words || words.length === 0) {
    return [];
  }


  const wordEntropyList = [];

  const limit = Math.min(50, words.length);

  for (let i = 0; i < limit; i++) {
    const guessWord = words[i];
    let entropy = 0;

    const patternCounts = {};

    for (let j = 0; j < permutations.length; j++) {
      const pattern = permutations[j];

      const constraints = patternToConstraints(guessWord, pattern);

      const remainingWords = filterWordList(
        words,
        constraints.greens,
        constraints.yellows,
        constraints.grays,
        constraints.yellowPositions
      );

      patternCounts[pattern] = remainingWords.length;
    }

    // calculate entropy: -sum(p * log2(p))
    for (let pattern in patternCounts) {
      const count = patternCounts[pattern];
      if (count > 0) {
        const p = count / words.length;
        entropy -= p * Math.log2(p);
      }
    }

    wordEntropyList.push({ word: guessWord, entropy: entropy });
  }

  wordEntropyList.sort((a, b) => b.entropy - a.entropy);

  const topWords = wordEntropyList.slice(0, maxWords);

  console.log(
    "Top entropy words:",
    topWords
      .slice(0, 20)
      .map((w) => `${w.word}(${w.entropy.toFixed(2)})`)
      .join(", ")
  );

  return topWords;
};

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

  return sortable.map((innerArray) => innerArray[0]);
};
