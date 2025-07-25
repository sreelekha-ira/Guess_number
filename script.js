// --- Sticker assets (replace with your own PNG/SVG URLs as desired)
const stickers = {
  idle: "images.png",
  think: "images.jpg",
  correct: "56167b76252a05dbf3a989c37a9b67fb.jpg",
  wrong: "download.jpg",
  hint: "56167b76252a05dbf3a989c37a9b67fb.jpg"
};

// 20 unique math problems, well-structured and shuffled at each game start
const rawProblems = [
  {
    id: "derivative_2x3_at_4",
    answers: [11],
    variableSubstitution: { x: 4 },
    levels: [
      { difficulty: "hard", question: "Calculate d/dx of f(x) = 2x + 3 at x = {x}.", hint: "Derivative is 2; plug in x = {x}, compute 2×{x} + 3." },
      { difficulty: "medium", question: "Evaluate 2 × {x} + 3.", hint: "2 × {x} = ? then add 3." },
      { difficulty: "easy", question: "What is 2 × {x} plus 3?", hint: "2 × {x} + 3." }
    ]
  },
  {
    id: "quadratic_roots_x2_5x6",
    answers: [2, 3],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Find roots of x² - 5x + 6 = 0.", hint: "Factor: (x-2)(x-3)=0." },
      { difficulty: "medium", question: "Try x=2 or x=3 in x² - 5x + 6. Enter one solution.", hint: "See if 2 or 3 works." },
      { difficulty: "easy", question: "Give one value: 2 or 3.", hint: "2 and 3 are roots." }
    ]
  },
  {
    id: "add_7_8",
    answers: [15],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "What is 7 + 8?", hint: "Add together." },
      { difficulty: "medium", question: "Sum of 7 and 8?", hint: "7 + 8 = ?" },
      { difficulty: "easy", question: "Add 7 plus 8.", hint: "7 + 8." }
    ]
  },
  {
    id: "mult_12_3",
    answers: [36],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "What is 12 × 3?", hint: "Multiply 12 by 3." },
      { difficulty: "medium", question: "12 times 3 equals?", hint: "?" },
      { difficulty: "easy", question: "Calculate 12 × 3.", hint: "Multiply." }
    ]
  },
  {
    id: "int_x_0_1",
    answers: [0.5],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Evaluate ∫₀¹ x dx.", hint: "Integral is x²/2." },
      { difficulty: "medium", question: "What is (1²)/2 - (0²)/2?", hint: "Evaluate 1/2." },
      { difficulty: "easy", question: "What is 1² divided by 2?", hint: "Square and divide." }
    ]
  },
  {
    id: "lcm_9_12",
    answers: [36],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Find LCM of 9 and 12.", hint: "List multiples." },
      { difficulty: "medium", question: "LCM of 9,12 is?", hint: "?" },
      { difficulty: "easy", question: "The smallest number divisible by 9 & 12?", hint: "Try 36." }
    ]
  },
  {
    id: "remainder_23_5",
    answers: [3],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Remainder when 23 is divided by 5?", hint: "23 = 5×4 + ?" },
      { difficulty: "medium", question: "What is 23 - 5×4?", hint: "Subtract." },
      { difficulty: "easy", question: "Remainder when 23/5?", hint: "3." }
    ]
  },
  {
    id: "det_2_3_1_4",
    answers: [5],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Determinant of matrix [[2,3],[1,4]]?", hint: "ad-bc = 2×4 - 1×3." },
      { difficulty: "medium", question: "Compute 2×4 - 1×3.", hint: "8-3=?" },
      { difficulty: "easy", question: "8 - 3 = ?", hint: "?" }
    ]
  },
  {
    id: "division_20_4",
    answers: [5],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "What is 20 ÷ 4?", hint: "Divide." },
      { difficulty: "medium", question: "20 divided by 4 is?", hint: "?" },
      { difficulty: "easy", question: "Divide 20 by 4.", hint: "5." }
    ]
  },
  {
    id: "abs_neg7",
    answers: [7],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "What is |−7|?", hint: "Absolute value becomes positive." },
      { difficulty: "medium", question: "Absolute value of −7?", hint: "Drop the minus." },
      { difficulty: "easy", question: "How far is −7 from 0?", hint: "7." }
    ]
  },
  {
    id: "log2_32",
    answers: [5],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "What is log₂32?", hint: "2^x = 32" },
      { difficulty: "medium", question: "2 raised to which power gives 32?", hint: "2×2×2×2×2" },
      { difficulty: "easy", question: "2 × 2 × 2 × 2 × 2 = ?", hint: "Count multiplications." }
    ]
  },
  {
    id: "prime_97",
    answers: ["yes"],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Is 97 a prime number? (yes/no)", hint: "Divisible only by 1 and itself." },
      { difficulty: "medium", question: "Prime: does 97 have only two divisors? (yes/no)", hint: "Yes." },
      { difficulty: "easy", question: "Type 'yes': is 97 prime?", hint: "yes." }
    ]
  },
  {
    id: "exp_3_4",
    answers: [81],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "3 to the power 4?", hint: "Multiply 3×3×3×3." },
      { difficulty: "medium", question: "What is 3 × 3 × 3 × 3?", hint: "3×3=9, then ×3, ×3." },
      { difficulty: "easy", question: "Multiply 9 × 9.", hint: "81." }
    ]
  },
  {
    id: "lin_equation_3x_5_20",
    answers: [5],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Solve: 3x + 5 = 20 for x.", hint: "Subtract 5, then divide by 3." },
      { difficulty: "medium", question: "What is (20−5)/3?", hint: "15÷3." },
      { difficulty: "easy", question: "Divide 15 by 3.", hint: "5." }
    ]
  },
  {
    id: "arith_seq_n10_a2_d3",
    answers: [29],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "10th term of sequence: 2,5,8,...?", hint: "Formula: a_n = a1 + (n−1)d." },
      { difficulty: "medium", question: "Calculate 2+(10−1)×3.", hint: "2+27=?" },
      { difficulty: "easy", question: "2 + 27 = ?", hint: "29." }
    ]
  },
  {
    id: "area_circle_r3",
    answers: [28.27],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Area of circle, r = 3. (Round to 2 decimals)", hint: "π×r², use π ≈ 3.14." },
      { difficulty: "medium", question: "What is 3.14 × 9?", hint: "Multiply." },
      { difficulty: "easy", question: "Multiply 3.14 by 9.", hint: "28.27." }
    ]
  },
  {
    id: "fraction_14_7",
    answers: [2],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "Evaluate 14/7.", hint: "Divide numerator by denominator." },
      { difficulty: "medium", question: "How many times does 7 go into 14?", hint: "Twice." },
      { difficulty: "easy", question: "14 ÷ 7 = ?", hint: "2." }
    ]
  },
  {
    id: "sqrt_121",
    answers: [11],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "What is the square root of 121?", hint: "What number squared is 121?" },
      { difficulty: "medium", question: "x² = 121; find x.", hint: "11 × 11." },
      { difficulty: "easy", question: "What is 11 × 11?", hint: "121." }
    ]
  },
  {
    id: "sub_25_13",
    answers: [12],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "What is 25 − 13?", hint: "Subtract." },
      { difficulty: "medium", question: "Subtract 13 from 25.", hint: "?" },
      { difficulty: "easy", question: "25 minus 13.", hint: "12." }
    ]
  },
  {
    id: "exp_2_6",
    answers: [64],
    variableSubstitution: {},
    levels: [
      { difficulty: "hard", question: "2 raised to the 6th power?", hint: "Multiply 2 × 2, 6 times." },
      { difficulty: "medium", question: "What is 2 × 2 × 2 × 2 × 2 × 2?", hint: "Calculate." },
      { difficulty: "easy", question: "Multiply 32 × 2.", hint: "64." }
    ]
  },
  {
    id: "golden_ratio_1",
    answers: [2],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "If golden ratio is ~1.618, what is the nearest whole number?",
        hint: "Round off 1.618."
      },
      {
        difficulty: "medium",
        question: "Round 1.6 to the nearest whole number.",
        hint: "0.5+ goes up."
      },
      {
        difficulty: "easy",
        question: "Is 1.618 closer to 1 or 2?",
        hint: "It is above 1.5."
      }
    ]
  },
  {
    id: "percent_discount_2",
    answers: [25],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "A Rs.100 item is sold for Rs.75. What percent discount?",
        hint: "(100 - 75) = 25."
      },
      {
        difficulty: "medium",
        question: "How much off in percentage is Rs.100 to Rs.75?",
        hint: "Difference is 25. Out of 100."
      },
      {
        difficulty: "easy",
        question: "How many percent is 25 out of 100?",
        hint: "Basic percent formula: (part/whole)*100"
      }
    ]
  },
  {
    id: "lcm_mix_3",
    answers: [12],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "What is the LCM of 3 and 4 added to the square of 0?",
        hint: "LCM(3,4)=12, 0 squared is 0."
      },
      {
        difficulty: "medium",
        question: "Calculate the least common multiple of 3 and 4.",
        hint: "Find the smallest number divisible by both 3 and 4."
      },
      {
        difficulty: "easy",
        question: "What is the smallest number that both 3 and 4 divide into evenly?",
        hint: "Try listing multiples of 3 and 4."
      }
    ]
  },
  {
    id: "date_math_4",
    answers: [1879],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "In which year was Albert Einstein born?",
        hint: "He was born in the 19th century."
      },
      {
        difficulty: "medium",
        question: "Einstein's birth year is 1800 + ?",
        hint: "Einstein was born 79 years after 1800."
      },
      {
        difficulty: "easy",
        question: "Einstein was born in the year 18__.",
        hint: "The last two digits are 79."
      }
    ]
  },
  {
    id: "profit_loss_5",
    answers: [20],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "A book was bought for Rs.80 and sold at Rs.100. What is the profit?",
        hint: "Selling Price - Cost Price = Profit"
      },
      {
        difficulty: "medium",
        question: "Find the profit when CP = 80 and SP = 100.",
        hint: "Subtract 80 from 100."
      },
      {
        difficulty: "easy",
        question: "How much more is 100 than 80?",
        hint: "Just subtract!"
      }
    ]
  },
  {
    id: "golden_ratio_6",
    answers: [2],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "If golden ratio is ~1.618, what is the nearest whole number?",
        hint: "Round off 1.618."
      },
      {
        difficulty: "medium",
        question: "Round 1.6 to the nearest whole number.",
        hint: "0.5+ goes up."
      },
      {
        difficulty: "easy",
        question: "Is 1.618 closer to 1 or 2?",
        hint: "It is above 1.5."
      }
    ]
  },
  {
    id: "date_math_7",
    answers: [1879],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "In which year was Albert Einstein born?",
        hint: "He was born in the 19th century."
      },
      {
        difficulty: "medium",
        question: "Einstein's birth year is 1800 + ?",
        hint: "Einstein was born 79 years after 1800."
      },
      {
        difficulty: "easy",
        question: "Einstein was born in the year 18__.",
        hint: "The last two digits are 79."
      }
    ]
  },
  {
    id: "percent_discount_8",
    answers: [25],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "A Rs.100 item is sold for Rs.75. What percent discount?",
        hint: "(100 - 75) = 25."
      },
      {
        difficulty: "medium",
        question: "How much off in percentage is Rs.100 to Rs.75?",
        hint: "Difference is 25. Out of 100."
      },
      {
        difficulty: "easy",
        question: "How many percent is 25 out of 100?",
        hint: "Basic percent formula: (part/whole)*100"
      }
    ]
  },
  {
    id: "lcm_mix_9",
    answers: [12],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "What is the LCM of 3 and 4 added to the square of 0?",
        hint: "LCM(3,4)=12, 0 squared is 0."
      },
      {
        difficulty: "medium",
        question: "Calculate the least common multiple of 3 and 4.",
        hint: "Find the smallest number divisible by both 3 and 4."
      },
      {
        difficulty: "easy",
        question: "What is the smallest number that both 3 and 4 divide into evenly?",
        hint: "Try listing multiples of 3 and 4."
      }
    ]
  },
  {
    id: "profit_loss_10",
    answers: [20],
    variableSubstitution: {},
    levels: [
      {
        difficulty: "hard",
        question: "A book was bought for Rs.80 and sold at Rs.100. What is the profit?",
        hint: "Selling Price - Cost Price = Profit"
      },
      {
        difficulty: "medium",
        question: "Find the profit when CP = 80 and SP = 100.",
        hint: "Subtract 80 from 100."
      },
      {
        difficulty: "easy",
        question: "How much more is 100 than 80?",
        hint: "Just subtract!"
      }
    ]
  }

  
];

let shuffledProblems = [];
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

// Shuffle the problems to ensure each is only shown once per cycle
function shuffleProblems() {
  shuffledProblems = rawProblems.slice();
  for (let i = shuffledProblems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledProblems[i], shuffledProblems[j]] = [shuffledProblems[j], shuffledProblems[i]];
  }
}

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
  const prob = shuffledProblems[currentProblemIndex];
  const lvl = prob.levels[currentLevelIndex];
  const questionText = substituteVars(lvl.question, prob.variableSubstitution || {});
  mathQ.textContent = questionText;
  mathA.value = "";
  feedback.textContent = "";
  postStatus.textContent = "";
  setSticker('think');
}

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
  const prob = shuffledProblems[currentProblemIndex];
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

mathForm.onsubmit = e => {
  e.preventDefault();
  const prob = shuffledProblems[currentProblemIndex];
  const userAnswer = mathA.value;
  attempts++;

  if (validateAnswer(userAnswer, prob.answers)) {
    correctCount++;
    setSticker('correct');
    postStatus.innerHTML = `
      <span style="color:#07751a; font-weight:bold;">
        🎉 Correct! Your guess: <b>${userAnswer}</b><br />
        Math Accuracy: <b>${Math.round((correctCount / attempts) * 100)}%</b><br />
        Total Attempts: <b>${attempts}</b><br />
        Moving to next problem...
      </span>
    `;
    mathA.disabled = true;
    mathForm.querySelector('button[type="submit"]').disabled = true;
    hintBtn.disabled = true;

    setTimeout(() => {
      currentProblemIndex++;
      // If all problems are completed, reshuffle for a new non-repeating cycle
      if (currentProblemIndex >= shuffledProblems.length) {
        shuffleProblems();
        currentProblemIndex = 0;
      }
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
  shuffleProblems();
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
  shuffleProblems();
  currentProblemIndex = 0;
  currentLevelIndex = 0;
  updateStats();
  setSticker('idle');
  displayCurrentQuestion();
};
