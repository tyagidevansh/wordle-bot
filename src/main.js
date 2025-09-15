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
    });
  });
});
