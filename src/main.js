const ANSWER = "CARDS";

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll('input[maxlength="1"]');

  // focus on the first cell on page load
  inputs[0].focus();

  // clean up everything on reload
  // prob wont keep it once the actual game exists, dont want people to have free tries
  inputs.forEach((input) => {
    input.value = "";
  });

  // convert each letter to uppercase
  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = input.value.toUpperCase();
      // reject all non-alphabet input values
      if (input.value < "A" || input.value > "Z") {
        input.value = "";
      } else {
        // auto roll-over
        if ((index + 1) % 5 == 0) {
          //do nothing if we're on the last cell of a row
        } else if (input.value.length == input.maxLength) {
          inputs[index + 1].focus();
        }
      }
    });

    // unless we're on the first cell, target the cell before the focused one
    // the focused cell is always the one just after the filled cells
    let backspaceIndex = index % 5 == 0 ? index : index - 1;

    input.addEventListener("keydown", (event) => {
      if (event.key === "Backspace") {
        event.preventDefault(); // otherwise current cell would get erased too
        inputs[backspaceIndex].focus();
        input.value = "";
      }
      
      //allow submit on last cell of each row
      if (event.key === "Enter" && (index + 1) % 5 == 0) {
        handleSubmit(input);
      }
    });
  });
});

const handleSubmit = (input) => {
  var form = input.form; // stack overflow hack, dunno if its widely used
  let value = [];

  for (i = 0; i < form.length; i++) {
    value.push(form[i].value);
  }

  checkGuess(form, value);
};

// to check i'll perform three passes over the guess word -> first to check for the letters which are in the exact position
// then to check for letters than exist but arent in the right place
// then for letters that don't exist at all
const checkGuess = (form, guess) => {
  let colors = ["gray", "gray", "gray", "gray", "gray"];
  let answer = ANSWER.split('');

  for (i = 0; i < 5; i++) {
    let guessChar = guess[i];
    let answerChar = answer[i];

    if (guessChar == answerChar) {
      colors[i] = "green"; 
      answer[i] = "x";     
    }
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

  console.log(colors);

  for (i = 0; i < 5; i++) {
    form[i].style.color = colors[i];
  }
}
