let ANSWER = null;
let wordListLine = null;
let wordList = null;
let focusedIdx = 0;

let inputs = null;
let keys = null;

let canMakeGuesses = true;

let greenChar = ["", "", "", "", ""];
let yellowChar = [];
let yellowPositions = {};
let grayChar = [];

permutations = [
  "GGGGG",
  "GGGGB",
  "GGGYY",
  "GGGYB",
  "GGGBG",
  "GGGBY",
  "GGGBB",
  "GGYGY",
  "GGYGB",
  "GGYYG",
  "GGYYY",
  "GGYYB",
  "GGYBG",
  "GGYBY",
  "GGYBB",
  "GGBGG",
  "GGBGY",
  "GGBGB",
  "GGBYG",
  "GGBYY",
  "GGBYB",
  "GGBBG",
  "GGBBY",
  "GGBBB",
  "GYGGY",
  "GYGGB",
  "GYGYG",
  "GYGYY",
  "GYGYB",
  "GYGBG",
  "GYGBY",
  "GYGBB",
  "GYYGG",
  "GYYGY",
  "GYYGB",
  "GYYYG",
  "GYYYY",
  "GYYYB",
  "GYYBG",
  "GYYBY",
  "GYYBB",
  "GYBGG",
  "GYBGY",
  "GYBGB",
  "GYBYG",
  "GYBYY",
  "GYBYB",
  "GYBBG",
  "GYBBY",
  "GYBBB",
  "GBGGG",
  "GBGGY",
  "GBGGB",
  "GBGYG",
  "GBGYY",
  "GBGYB",
  "GBGBG",
  "GBGBY",
  "GBGBB",
  "GBYGG",
  "GBYGY",
  "GBYGB",
  "GBYYG",
  "GBYYY",
  "GBYYB",
  "GBYBG",
  "GBYBY",
  "GBYBB",
  "GBBGG",
  "GBBGY",
  "GBBGB",
  "GBBYG",
  "GBBYY",
  "GBBYB",
  "GBBBG",
  "GBBBY",
  "GBBBB",
  "YGGGY",
  "YGGGB",
  "YGGYG",
  "YGGYY",
  "YGGYB",
  "YGGBG",
  "YGGBY",
  "YGGBB",
  "YGYGG",
  "YGYGY",
  "YGYGB",
  "YGYYG",
  "YGYYY",
  "YGYYB",
  "YGYBG",
  "YGYBY",
  "YGYBB",
  "YGBGG",
  "YGBGY",
  "YGBGB",
  "YGBYG",
  "YGBYY",
  "YGBYB",
  "YGBBG",
  "YGBBY",
  "YGBBB",
  "YYGGG",
  "YYGGY",
  "YYGGB",
  "YYGYG",
  "YYGYY",
  "YYGYB",
  "YYGBG",
  "YYGBY",
  "YYGBB",
  "YYYGG",
  "YYYGY",
  "YYYGB",
  "YYYYG",
  "YYYYY",
  "YYYYB",
  "YYYBG",
  "YYYBY",
  "YYYBB",
  "YYBGG",
  "YYBGY",
  "YYBGB",
  "YYBYG",
  "YYBYY",
  "YYBYB",
  "YYBBG",
  "YYBBY",
  "YYBBB",
  "YBGGG",
  "YBGGY",
  "YBGGB",
  "YBGYG",
  "YBGYY",
  "YBGYB",
  "YBGBG",
  "YBGBY",
  "YBGBB",
  "YBYGG",
  "YBYGY",
  "YBYGB",
  "YBYYG",
  "YBYYY",
  "YBYYB",
  "YBYBG",
  "YBYBY",
  "YBYBB",
  "YBBGG",
  "YBBGY",
  "YBBGB",
  "YBBYG",
  "YBBYY",
  "YBBYB",
  "YBBBG",
  "YBBBY",
  "YBBBB",
  "BGGGG",
  "BGGGY",
  "BGGGB",
  "BGGYG",
  "BGGYY",
  "BGGYB",
  "BGGBG",
  "BGGBY",
  "BGGBB",
  "BGYGG",
  "BGYGY",
  "BGYGB",
  "BGYYG",
  "BGYYY",
  "BGYYB",
  "BGYBG",
  "BGYBY",
  "BGYBB",
  "BGBGG",
  "BGBGY",
  "BGBGB",
  "BGBYG",
  "BGBYY",
  "BGBYB",
  "BGBBG",
  "BGBBY",
  "BGBBB",
  "BYGGG",
  "BYGGY",
  "BYGGB",
  "BYGYG",
  "BYGYY",
  "BYGYB",
  "BYGBG",
  "BYGBY",
  "BYGBB",
  "BYYGG",
  "BYYGY",
  "BYYGB",
  "BYYYG",
  "BYYYY",
  "BYYYB",
  "BYYBG",
  "BYYBY",
  "BYYBB",
  "BYBGG",
  "BYBGY",
  "BYBGB",
  "BYBYG",
  "BYBYY",
  "BYBYB",
  "BYBBG",
  "BYBBY",
  "BYBBB",
  "BBGGG",
  "BBGGY",
  "BBGGB",
  "BBGYG",
  "BBGYY",
  "BBGYB",
  "BBGBG",
  "BBGBY",
  "BBGBB",
  "BBYGG",
  "BBYGY",
  "BBYGB",
  "BBYYG",
  "BBYYY",
  "BBYYB",
  "BBYBG",
  "BBYBY",
  "BBYBB",
  "BBBGG",
  "BBBGY",
  "BBBGB",
  "BBBYG",
  "BBBYY",
  "BBBYB",
  "BBBBG",
  "BBBBY",
  "BBBBB",
];

const INITIAL_BEST_GUESSES = [
  {
    word: "rates",
    probability: 0.9706,
    entropy: 6.7136513096165364,
    score: 8.654851309616536,
  },
  {
    word: "laser",
    probability: 0.8979,
    entropy: 6.249876248232372,
    score: 8.045676248232372,
  },
  {
    word: "tears",
    probability: 0.7187,
    entropy: 6.551016233600498,
    score: 7.988416233600498,
  },
  {
    word: "raise",
    probability: 0.8479,
    entropy: 6.282263033027902,
    score: 7.978063033027902,
  },
  {
    word: "arise",
    probability: 0.6978,
    entropy: 6.055642738993307,
    score: 7.451242738993307,
  },
  {
    word: "earns",
    probability: 0.3332,
    entropy: 6.366861668614153,
    score: 7.033261668614153,
  },
  {
    word: "arose",
    probability: 0.4339,
    entropy: 6.118350579286715,
    score: 6.986150579286715,
  },
  {
    word: "reals",
    probability: 0.1951,
    entropy: 6.532779719695167,
    score: 6.922979719695167,
  },
  {
    word: "stare",
    probability: 0.3649,
    entropy: 6.168185599724384,
    score: 6.897985599724384,
  },
  {
    word: "tares",
    probability: 0.0254,
    entropy: 6.823809914036242,
    score: 6.874609914036242,
  },
  {
    word: "aisle",
    probability: 0.3639,
    entropy: 6.087553783713163,
    score: 6.815353783713163,
  },
  {
    word: "arles",
    probability: 0.1372,
    entropy: 6.528865565424314,
    score: 6.803265565424314,
  },
  {
    word: "lares",
    probability: 0.0238,
    entropy: 6.7269322409728,
    score: 6.7745322409728,
  },
  {
    word: "earls",
    probability: 0.1702,
    entropy: 6.427770981892245,
    score: 6.768170981892244,
  },
  {
    word: "rales",
    probability: 0.0115,
    entropy: 6.741328040137408,
    score: 6.764328040137408,
  },
  {
    word: "snare",
    probability: 0.2853,
    entropy: 6.177551857793739,
    score: 6.748151857793739,
  },
  {
    word: "nares",
    probability: 0.0198,
    entropy: 6.688058334629991,
    score: 6.727658334629991,
  },
  {
    word: "nears",
    probability: 0.1543,
    entropy: 6.415147037877107,
    score: 6.723747037877107,
  },
  {
    word: "ranes",
    probability: 0.001,
    entropy: 6.694860633656685,
    score: 6.6968606336566845,
  },
  {
    word: "teras",
    probability: 0.0089,
    entropy: 6.667031435030617,
    score: 6.684831435030617,
  },
  {
    word: "aeros",
    probability: 0.0455,
    entropy: 6.577574806527985,
    score: 6.668574806527985,
  },
  {
    word: "reais",
    probability: 0.0338,
    entropy: 6.561403677352146,
    score: 6.629003677352146,
  },
  {
    word: "seria",
    probability: 0.0705,
    entropy: 6.4569843642574805,
    score: 6.5979843642574805,
  },
  {
    word: "saner",
    probability: 0.0295,
    entropy: 6.529437110125242,
    score: 6.588437110125242,
  },
  {
    word: "sater",
    probability: 0.0198,
    entropy: 6.537139770777034,
    score: 6.576739770777034,
  },
  {
    word: "soare",
    probability: 0.001,
    entropy: 6.546928848837518,
    score: 6.548928848837518,
  },
  {
    word: "taser",
    probability: 0.0935,
    entropy: 6.350239367723544,
    score: 6.5372393677235445,
  },
  {
    word: "aloes",
    probability: 0.0238,
    entropy: 6.468959977991522,
    score: 6.516559977991522,
  },
  {
    word: "toeas",
    probability: 0.001,
    entropy: 6.514336201374067,
    score: 6.516336201374067,
  },
  {
    word: "aeons",
    probability: 0.0319,
    entropy: 6.417261669405689,
    score: 6.481061669405689,
  },
  {
    word: "laers",
    probability: 0.001,
    entropy: 6.47500859138647,
    score: 6.47700859138647,
  },
  {
    word: "serai",
    probability: 0.0139,
    entropy: 6.442253166235533,
    score: 6.470053166235533,
  },
  {
    word: "lears",
    probability: 0.0064,
    entropy: 6.454129753011368,
    score: 6.466929753011368,
  },
  {
    word: "reans",
    probability: 0.001,
    entropy: 6.4615811966097105,
    score: 6.46358119660971,
  },
  {
    word: "seral",
    probability: 0.0209,
    entropy: 6.420968170350839,
    score: 6.46276817035084,
  },
  {
    word: "arets",
    probability: 0.001,
    entropy: 6.361882802300943,
    score: 6.363882802300942,
  },
  {
    word: "tarse",
    probability: 0.001,
    entropy: 6.349431221775428,
    score: 6.351431221775428,
  },
  {
    word: "strae",
    probability: 0.001,
    entropy: 6.292003622517227,
    score: 6.294003622517227,
  },
  {
    word: "aster",
    probability: 0.1842,
    entropy: 5.888286680828633,
    score: 6.256686680828634,
  },
  {
    word: "ranse",
    probability: 0.001,
    entropy: 6.232109022127793,
    score: 6.234109022127793,
  },
  {
    word: "stoae",
    probability: 0.001,
    entropy: 6.204475252050297,
    score: 6.206475252050296,
  },
  {
    word: "resat",
    probability: 0.001,
    entropy: 6.167852624909996,
    score: 6.169852624909995,
  },
  {
    word: "aesir",
    probability: 0.0129,
    entropy: 6.120936929193194,
    score: 6.146736929193194,
  },
  {
    word: "stear",
    probability: 0.0101,
    entropy: 6.085271101203848,
    score: 6.105471101203848,
  },
  {
    word: "reast",
    probability: 0.0059,
    entropy: 6.081107755891869,
    score: 6.092907755891869,
  },
  {
    word: "anise",
    probability: 0.0963,
    entropy: 5.819555798994505,
    score: 6.012155798994504,
  },
  {
    word: "earst",
    probability: 0.001,
    entropy: 5.985932908536648,
    score: 5.9879329085366475,
  },
  {
    word: "alose",
    probability: 0.001,
    entropy: 5.969448475161251,
    score: 5.97144847516125,
  },
  {
    word: "neosa",
    probability: 0.001,
    entropy: 5.967917461852079,
    score: 5.969917461852079,
  },
  {
    word: "isnae",
    probability: 0.001,
    entropy: 5.720393319250003,
    score: 5.722393319250003,
  },
];
let totalWords = null;
let expectedInfoGain = null;
let actualInfoGain = null;
let remainingUncertainty = null;
let previousPossibleWords = null;
let lastGuessWord = null;

const updateStats = () => {
  document.getElementById("stat-total").textContent = totalWords || "—";
  document.getElementById("stat-possible").textContent = wordList
    ? wordList.length
    : "—";
  document.getElementById("stat-expected-gain").textContent =
    expectedInfoGain !== null ? expectedInfoGain.toFixed(3) + " bits" : "—";
  document.getElementById("stat-actual-gain").textContent =
    actualInfoGain !== null ? actualInfoGain.toFixed(3) + " bits" : "—";
  document.getElementById("stat-uncertainty").textContent =
    remainingUncertainty !== null
      ? remainingUncertainty.toFixed(3) + " bits"
      : "—";
};

const setRightPanelMessage = (message) => {
  const validGuessDisplay = document.getElementById("right");
  validGuessDisplay.innerHTML = `<div style="font-family: monospace; font-size: 16px; white-space: pre-wrap;">${message}</div>`;
};

const loadTextFile = async (paths) => {
  const failures = [];

  for (const path of paths) {
    try {
      const response = await fetch(path, { cache: "no-store" });
      if (!response.ok) {
        failures.push(`${path} (${response.status})`);
        continue;
      }
      return await response.text();
    } catch (error) {
      failures.push(`${path} (${error.message})`);
    }
  }

  throw new Error(failures.join("; "));
};

document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.protocol === "file:") {
    setRightPanelMessage(
      "Word lists cannot be loaded when opening index.html directly from disk (file://).\n\nUse a static server or GitHub Pages so fetch() can read files.",
    );
  }

  try {
    const validWordsText = await loadTextFile([
      "public/valid-wordle-words.txt",
      "./public/valid-wordle-words.txt",
      "valid-wordle-words.txt",
    ]);

    const lines = validWordsText.split("\n");

    wordList = lines
      .map((line) => {
        const parts = line.split(",");
        if (parts.length >= 2) {
          const word = parts[0].trim();
          const probability = parseFloat(parts[1].trim());
          if (word.length === 5 && !isNaN(probability)) {
            return { word, probability };
          }
        }
        return null;
      })
      .filter((item) => item !== null);

    totalWords = wordList.length;
    wordList = calculateWordFrequencies(wordList);

    const topEntropyWords = INITIAL_BEST_GUESSES.slice(0, 50);
    const tableHTML = `
      <div style="display: grid; grid-template-columns: auto auto auto; gap: 20px; font-family: monospace; font-size: 16px;">
        <div>
          <div style="font-weight: bold; margin-bottom: 8px;">Word</div>
          ${topEntropyWords.map((item) => `<div>${item.word}</div>`).join("")}
        </div>
        <div>
          <div style="font-weight: bold; margin-bottom: 8px;">Entropy</div>
          ${topEntropyWords
            .map((item) => `<div>${item.entropy.toFixed(3)}</div>`)
            .join("")}
        </div>
        <div>
          <div style="font-weight: bold; margin-bottom: 8px;">Probability</div>
          ${topEntropyWords
            .map((item) => `<div>${item.probability.toFixed(4)}</div>`)
            .join("")}
        </div>
      </div>
    `;

    document.getElementById("right").innerHTML = tableHTML;
    previousPossibleWords = wordList.length;
    updateStats();

    const answersText = await loadTextFile([
      "public/possible-answers.txt",
      "./public/possible-answers.txt",
      "possible-answers.txt",
    ]);

    const answerList = answersText
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (!answerList.length) {
      throw new Error("No answers found in possible-answers.txt");
    }

    const randomIdx = Math.floor(Math.random() * answerList.length);
    ANSWER = answerList[randomIdx].toUpperCase();
    console.log(`Game started. Answer selected: ${ANSWER}`);
  } catch (error) {
    console.error("Failed to initialize word lists", error);
    setRightPanelMessage(
      `Could not load word lists.\n\n${error.message}\n\nIf testing locally, run a static server instead of opening index.html directly.`,
    );
  }

  inputs = document.querySelectorAll('input[maxlength="1"]');
  keys = document.querySelectorAll(".key");

  inputs.forEach((input) => {
    input.value = "";
  });

  inputs[0].focus();
  inputs.forEach((input) => {
    input.addEventListener("input", () => handleInputField(input));

    input.addEventListener("keydown", (event) =>
      handleBackspaceAndEnter(event),
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
  const guessWord = guess.join("");

  const patternStr = colors
    .map((c) => {
      if (c === "green") return "G";
      if (c === "yellow") return "Y";
      return "B";
    })
    .join("");

  expectedInfoGain = calculateEntropyForWord(guessWord, wordList);

  lastGuessWord = guessWord;

  const guessInList = wordList.findIndex(
    (wordObj) => wordObj.word === guessWord,
  );
  if (guessInList >= 0) wordList.splice(guessInList, 1);

  findValidGuesses(patternStr, guessWord);
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

const getPattern = (guess, answer) => {
  const pattern = ["B", "B", "B", "B", "B"];
  const answerChars = answer.split("");
  const guessChars = guess.split("");

  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === answerChars[i]) {
      pattern[i] = "G";
      answerChars[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (pattern[i] === "G") continue;

    const guessChar = guessChars[i];
    const answerIdx = answerChars.indexOf(guessChar);

    if (answerIdx !== -1) {
      pattern[i] = "Y";
      answerChars[answerIdx] = null;
    }
  }

  return pattern.join("");
};

const calculateEntropyForWord = (guessWord, wordObjects) => {
  if (!wordObjects || wordObjects.length === 0) return 0;

  let entropy = 0;
  const patternCounts = {};

  for (let j = 0; j < permutations.length; j++) {
    const pattern = permutations[j];
    const constraints = patternToConstraints(guessWord, pattern);

    const remainingWords = filterWordList(
      wordObjects,
      constraints.greens,
      constraints.yellows,
      constraints.grays,
      constraints.yellowPositions,
    );

    patternCounts[pattern] = remainingWords.length;
  }

  for (let pattern in patternCounts) {
    const count = patternCounts[pattern];
    if (count > 0) {
      const p = count / wordObjects.length;
      entropy -= p * Math.log2(p);
    }
  }

  return entropy;
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
  wordObjects,
  greens,
  yellows,
  grays,
  yellowPositions = {},
) => {
  return wordObjects.filter((wordObj) =>
    isWordValid(wordObj.word, greens, yellows, grays, yellowPositions),
  );
};

const findValidGuesses = (patternStr = null, guessWord = null) => {
  if (!wordList || wordList.length == 0) return null;

  if (patternStr && guessWord && previousPossibleWords !== null) {
    const preFilterWordList = [...wordList];

    const totalProb = preFilterWordList.reduce(
      (sum, w) => sum + w.probability,
      0,
    );
    let patternProb = 0;

    for (const wordObj of preFilterWordList) {
      const testPattern = getPattern(guessWord, wordObj.word);
      if (testPattern === patternStr) {
        patternProb += wordObj.probability / totalProb;
      }
    }

    if (patternProb > 0) {
      actualInfoGain = -Math.log2(patternProb);
    }
  }

  const filtered = filterWordList(
    wordList,
    greenChar,
    yellowChar,
    grayChar,
    yellowPositions,
  );

  const sorted = calculateWordFrequencies(filtered);

  const topEntropyWords = calculateEntropy(sorted, 50);

  const validGuessDisplay = document.getElementById("right");

  let tableHTML = `
    <div style="display: grid; grid-template-columns: auto auto auto; gap: 20px; font-family: monospace; font-size: 14px;">
      <div>
        <div style="font-weight: bold; margin-bottom: 8px;">Word</div>
        ${topEntropyWords.map((item) => `<div>${item.word}</div>`).join("")}
      </div>
      <div>
        <div style="font-weight: bold; margin-bottom: 8px;">Entropy</div>
        ${topEntropyWords
          .map((item) => `<div>${item.entropy.toFixed(3)}</div>`)
          .join("")}
      </div>
      <div>
        <div style="font-weight: bold; margin-bottom: 8px;">Probability</div>
        ${topEntropyWords
          .map((item) => `<div>${item.probability.toFixed(4)}</div>`)
          .join("")}
      </div>
    </div>
  `;

  validGuessDisplay.innerHTML = tableHTML;

  if (filtered.length > 0) {
    remainingUncertainty = Math.log2(filtered.length);
  }

  previousPossibleWords = filtered.length;

  wordList = sorted;

  updateStats();

  console.log(`${filtered.length} valid words remaining`);
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
  const wordObjects = candidateWords || wordList;

  if (!wordObjects || wordObjects.length === 0) {
    return [];
  }

  const wordEntropyList = [];

  const limit = Math.min(50, wordObjects.length);

  for (let i = 0; i < limit; i++) {
    const wordObj = wordObjects[i];
    const guessWord = wordObj.word;
    let entropy = 0;

    const patternCounts = {};

    for (let j = 0; j < permutations.length; j++) {
      const pattern = permutations[j];

      const constraints = patternToConstraints(guessWord, pattern);

      const remainingWords = filterWordList(
        wordObjects,
        constraints.greens,
        constraints.yellows,
        constraints.grays,
        constraints.yellowPositions,
      );

      patternCounts[pattern] = remainingWords.length;
    }

    for (let pattern in patternCounts) {
      const count = patternCounts[pattern];
      if (count > 0) {
        const p = count / wordObjects.length;
        entropy -= p * Math.log2(p);
      }
    }

    const score = entropy + wordObj.probability * 2;
    wordEntropyList.push({
      word: guessWord,
      probability: wordObj.probability,
      entropy: entropy,
      score: score,
    });
  }

  wordEntropyList.sort((a, b) => b.score - a.score);

  const topWords = wordEntropyList.slice(0, maxWords);
  return topWords;
};

const calculateWordFrequencies = (wordObjects) => {
  if (!wordObjects || wordObjects.length === 0) return [];

  let letterFrequencies = {};

  for (let i = 0; i < wordObjects.length; i++) {
    let word = wordObjects[i].word;

    word.split("").forEach((letter) => {
      if (letter in letterFrequencies) {
        letterFrequencies[letter] += 1;
      } else {
        letterFrequencies[letter] = 1;
      }
    });
  }

  let scoredWords = wordObjects.map((wordObj) => {
    let uniqueLetters = new Set(wordObj.word);
    let score = 0;

    uniqueLetters.forEach((letter) => {
      score += letterFrequencies[letter];
    });

    return {
      word: wordObj.word,
      probability: wordObj.probability,
      frequencyScore: score,
    };
  });

  scoredWords.sort((a, b) => b.frequencyScore - a.frequencyScore);

  return scoredWords;
};
