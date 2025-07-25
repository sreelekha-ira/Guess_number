// --- Sticker assets (replace with your own PNG/SVG URLs as desired)
const stickers = {
  idle: "assets/images.png",
  think: "assets/images.jpg",
  correct: "assets/56167b76252a05dbf3a989c37a9b67fb.jpg",
  wrong: "assets/download.jpg",
  hint: "assets/56167b76252a05dbf3a989c37a9b67fb.jpg"
};
// Images for animated stickers


// Math problems per your spec: multiple difficulty levels per problem,
// variable replacements, multiple answers, hints.
const mathProblems = [
  {
    id: "derivative_example_1",
    answers: [11],
    variableSubstitution: { x: 4 },
    levels: [
      { difficulty: "hard", question: "Calculate d/dx of f(x) = 2x + 3 at x = {x}.", hint: "Derivative is 2; multiply by {x}." },
      { difficulty: "medium", question: "Evaluate 2 × {x} + 3.", hint: "Multiply 2 and {x}, then add 3." },
      { difficulty: "easy", question: "Compute 2 times {x} plus 3.", hint: "Calculate 2 × {x} + 3." }
    ]
  },
  {
    id: "quadratic_roots",
    answers: [2, 3],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Find roots of x² - 5x + 6 = 0.", hint: "Factor as (x-2)(x-3)=0." },
      { difficulty: "medium", question: "Plug in x=2 or x=3. Does the expression equal 0? Enter 2 or 3.", hint: "Try substituting 2 or 3." },
      { difficulty: "easy", question: "Enter any root (2 or 3) that satisfies the equation.", hint: "Both 2 and 3 solve the equation." }
    ]
  }
  // Add more problems and levels as you like
];

let currentProblemIndex = 0;
let currentLevelIndex = 0;

let attempts = 0;
let correctCount = 0;

const stickerImg = document.getElementById('sticker-main');
const mathQ = document.getElementById('math-question');
const mathA = document.getElementById('math-answer');
const feedback = document.getElementById('math-feedback');
const postStatus = document.getElementById('post-status');
const restartBtn = document.getElementById('restart-btn');
const attemptsSpan = document.getElementById('attempts');
const accuracySpan = document.getElementById('accuracy');
const hintBtn = document.getElementById('hint-btn');
const mathForm = document.getElementById('math-form');

let lastSticker = "";

function setSticker(state) {
  if (state !== lastSticker) {
    stickerImg.src = stickers[state] || stickers.idle;
    lastSticker = state;
  }
}

function updateStats() {
  attemptsSpan.textContent = attempts;
  const accuracy = attempts > 0 ? Math.round((correctCount / attempts) * 100) : 100;
  accuracySpan.textContent = accuracy + "%";
}

// Substitute variables in question text
function substituteVars(text, vars) {
  let result = text;
  for (const [k,v] of Object.entries(vars)) {
    result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return result;
}

// Display current problem's current difficulty question
function displayCurrentQuestion() {
  const prob = mathProblems[currentProblemIndex];
  const lvl = prob.levels[currentLevelIndex];
  const questionText = substituteVars(lvl.question, prob.variableSubstitution || {});
  mathQ.textContent = questionText;
  mathA.value = "";
  feedback.textContent = "";
  postStatus.textContent = "";
  setSticker('think');
}

// Validate answer with rounding tolerance and multiple answers support
function validateAnswer(userAnswer, correctAnswers) {
  if (!userAnswer) return false;
  const input = userAnswer.trim().toLowerCase();
  const parsedNum = parseFloat(userAnswer);

  for (const answer of correctAnswers) {
    if (typeof answer === "number") {
      if (!isNaN(parsedNum) && Math.abs(answer - parsedNum) < 0.02) return true;
    } else {
      if (answer.toLowerCase() === input) return true;
    }
  }
  return false;
}

// Hint button logic to decrease difficulty level or repeat hint message
hintBtn.onclick = () => {
  const prob = mathProblems[currentProblemIndex];
  if (currentLevelIndex + 1 < prob.levels.length) {
    currentLevelIndex++;
    displayCurrentQuestion();
    feedback.textContent = "Try this easier question.";
    setSticker('hint');
  } else {
    feedback.textContent = "No easier hint available, think carefully!";
    setSticker('hint');
  }
};

// Main form submission: math answer is the guess number
mathForm.onsubmit = e => {
  e.preventDefault();
  const prob = mathProblems[currentProblemIndex];
  const lvl = prob.levels[currentLevelIndex];
  const userAnswer = mathA.value;

  attempts++;

  if (validateAnswer(userAnswer, prob.answers)) {
    correctCount++;
    setSticker('correct');

    // Show success message and move to next problem
    postStatus.innerHTML = `
      <span style="color:#07751a; font-weight:bold;">
        🎉 Correct! Your guess: <b>${userAnswer}</b><br />
        Math Accuracy: <b>${Math.round((correctCount / attempts) * 100)}%</b><br />
        Total Attempts: <b>${attempts}</b><br />
        Moving to next problem...
      </span>
    `;

    // Disable input briefly while moving on
    mathA.disabled = true;
    mathForm.querySelector('button[type="submit"]').disabled = true;
    hintBtn.disabled = true;

    // After short pause, load next problem and reset difficulty level
    setTimeout(() => {
      currentProblemIndex = (currentProblemIndex + 1) % mathProblems.length;
      currentLevelIndex = 0;
      mathA.disabled = false;
      mathForm.querySelector('button[type="submit"]').disabled = false;
      hintBtn.disabled = false;
      feedback.textContent = "";
      postStatus.textContent = "";
      mathA.value = "";
      displayCurrentQuestion();
    }, 3000);

  } else {
    setSticker('wrong');
    feedback.textContent = "Incorrect answer. Try again or press '?' for a hint.";
  }

  updateStats();
};

restartBtn.onclick = () => {
  attempts = 0;
  correctCount = 0;
  currentProblemIndex = 0;
  currentLevelIndex = 0;
  mathA.disabled = false;
  mathForm.querySelector('button[type="submit"]').disabled = false;
  hintBtn.disabled = false;
  postStatus.textContent = "";
  feedback.textContent = "";
  restartBtn.style.display = "none";
  updateStats();
  setSticker('idle');
  displayCurrentQuestion();
};

window.onload = () => {
  restartBtn.style.display = "none";
  attempts = 0;
  correctCount = 0;
  currentProblemIndex = 0;
  currentLevelIndex = 0;
  updateStats();
  setSticker('idle');
  displayCurrentQuestion();
};
