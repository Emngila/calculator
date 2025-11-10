document.addEventListener("DOMContentLoaded", function () {
  const largeDisplay = document.getElementById("largeDisplay");
  const smallDisplay = document.getElementById("smallDisplay");
  const keysContainer = document.getElementById("keys");

  let currentInput = "";
  let previousInput = "";
  let operator = "";
  let shouldResetDisplay = false;

  function updateDisplay() {
    largeDisplay.textContent = currentInput || "0";
    smallDisplay.textContent = previousInput
      ? `${previousInput} ${operator}`
      : "";
  }
  function calculate() {
    if (!previousInput || !operator || !currentInput) return;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    let result;
    switch (operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "×":
        result = prev * curr;
        break;
      case "÷":
        result = curr !== 0 ? prev / curr : "Error";
        break;
      default:
        return;
    }
    return result;
  }

  function handleInput(value) {
    if (shouldResetDisplay) {
      currentInput = "";
      shouldResetDisplay = false;
    }

    if (value === "DEL") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
      return;
    }

    if (value === "RESET") {
      currentInput = "";
      previousInput = "";
      operator = "";
      updateDisplay();
      return;
    }

    if (value === "=") {
      if (operator && currentInput) {
        const result = calculate();
        if (result === "Error") {
          currentInput = "Error";
        } else {
          currentInput = result.toString();
          previousInput = "";
          operator = "";
          smallDisplay.textContent = "";
        }
        updateDisplay();
        shouldResetDisplay = true;
      }
      return;
    }
    if (["+", "-", "×", "÷"].includes(value)) {
      if (currentInput || previousInput) {
        if (operator && currentInput) {
          const result = calculate();
          if (result !== undefined && result !== "Error") {
            currentInput = result.toString();
          } else {
            currentInput = "Error";
            updateDisplay();
            shouldResetDisplay = true;
            return;
          }
        }
        previousInput = currentInput;
        operator = value;
        currentInput = "";
        updateDisplay();
      }
      return;
    }

    if (value === "." && currentInput.includes(".")) {
      return;
    }

    if (currentInput === "0" && value !== ".") {
      currentInput = value;
    } else {
      currentInput += value;
    }

    updateDisplay();
  }

  keysContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const value = e.target.textContent.trim();

      handleInput(value);
    }
  });

  document.addEventListener("keydown", function (e) {
    const key = e.key;
    if ((key >= "0" && key <= "9") || key === ".") {
      handleInput(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      let op = key;
      if (key === "*") op = "×";
      if (key === "/") op = "÷";
      handleInput(op);
    } else if (key === "Enter" || key === "=") {
      handleInput("=");
    } else if (key === "Backspace") {
      handleInput("DEL");
    } else if (key.toLowerCase() === "escape") {
      handleInput("RESET");
    }
  });

  updateDisplay();
});

const dot = document.getElementById("dot");
const selectors = document.querySelectorAll(".selector");

selectors.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    dot.style.left = `${4 + 20 * i}px`;
    if (i === 3) {
      dot.style.left = `${4}px`;
    }
    if (i === 4) {
      dot.style.left = `${4 + 5 * i}px`;
    }
    if (i === 5) {
      dot.style.left = `${4 + 8 * i}px`;
    }
  });
});

const themeOne = document.getElementById("theme-1");
const themeTwo = document.getElementById("theme-2");
const themeThree = document.getElementById("theme-3");
const numOne = document.getElementById("num1");
const numTwo = document.getElementById("num2");
const numThree = document.getElementById("num3");
const html = document.documentElement;

themeOne.addEventListener("click", () => {
  html.setAttribute("data-theme", "theme-1");
});
themeTwo.addEventListener("click", () => {
  html.setAttribute("data-theme", "theme-2");
});
themeThree.addEventListener("click", () => {
  html.setAttribute("data-theme", "theme-3");
});

numOne.addEventListener("click", () => {
  html.setAttribute("data-theme", "theme-1");
});
numTwo.addEventListener("click", () => {
  html.setAttribute("data-theme", "theme-2");
});
numThree.addEventListener("click", () => {
  html.setAttribute("data-theme", "theme-3");
});
