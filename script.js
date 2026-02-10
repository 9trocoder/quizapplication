const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const quitButton = document.getElementById("quit-btn");
const reviewButton = document.getElementById("review-btn");
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionElement = document.getElementById("question-text");
const answerButtonsElement = document.getElementById("answer-buttons");
const quizInfo = document.getElementById("quiz-info");
const progressBar = document.getElementById("progress-bar");
const questionNumberSpan = document.getElementById("question-number");
const finalScoreSpan = document.getElementById("final-score");
const feedbackMessage = document.getElementById("feedback-message");
const timeText = document.getElementById("timer-text");

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timer;
let userAnswers = [];
let isReviewing = false;
const TIME_LIMIT = 5;

const questions = [
  {
    question:
      "What is the correct syntax to output 'Hello World' in the console?",
    answers: [
      { text: "print('Hello World')", correct: false },
      { text: "console.log('Hello World')", correct: true },
      { text: "echo('Hello World')", correct: false },
      { text: "sys.out('Hello World')", correct: false },
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      { text: "*", correct: false },
      { text: "-", correct: false },
      { text: "=", correct: true },
      { text: "==", correct: false },
    ],
  },
  {
    question: "What is the result of '2' + 2 in JavaScript?",
    answers: [
      { text: "4", correct: false },
      { text: "22", correct: true },
      { text: "NaN", correct: false },
      { text: "Error", correct: false },
    ],
  },
  {
    question: "Which keyword is used to define a constant variable?",
    answers: [
      { text: "let", correct: false },
      { text: "var", correct: false },
      { text: "const", correct: true },
      { text: "fixed", correct: false },
    ],
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Data Object Model", correct: false },
      { text: "Document Object Model", correct: true },
      { text: "Display Object Management", correct: false },
      { text: "Digital Ordinance Model", correct: false },
    ],
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function myFunction()", correct: true },
      { text: "def myFunction()", correct: false },
      { text: "create myFunction()", correct: false },
      { text: "function:myFunction()", correct: false },
    ],
  },
  {
    question: "How do you call a function named 'myFunction'?",
    answers: [
      { text: "call myFunction()", correct: false },
      { text: "myFunction()", correct: true },
      { text: "call function myFunction()", correct: false },
      { text: "myFunction", correct: false },
    ],
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      { text: "onchange", correct: false },
      { text: "onmouseclick", correct: false },
      { text: "onclick", correct: true },
      { text: "onmouseover", correct: false },
    ],
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answers: [
      { text: "var colors = (1:'red', 2:'green')", correct: false },
      { text: "var colors = ['red', 'green', 'blue']", correct: true },
      { text: "var colors = 'red', 'green', 'blue'", correct: false },
      { text: "var colors = {red, green, blue}", correct: false },
    ],
  },
  {
    question: "Which method removes the last element from an array?",
    answers: [
      { text: "push()", correct: false },
      { text: "pop()", correct: true },
      { text: "shift()", correct: false },
      { text: "remove()", correct: false },
    ],
  },
  {
    question: "What does 'NaN' stand for?",
    answers: [
      { text: "Not a Number", correct: true },
      { text: "Null and Null", correct: false },
      { text: "New and Native", correct: false },
      { text: "None a Number", correct: false },
    ],
  },
  {
    question: "Which statement is used to stop a loop?",
    answers: [
      { text: "stop", correct: false },
      { text: "return", correct: false },
      { text: "break", correct: true },
      { text: "exit", correct: false },
    ],
  },
  {
    question: "What is the result of typeof null?",
    answers: [
      { text: "'null'", correct: false },
      { text: "'undefined'", correct: false },
      { text: "'object'", correct: true },
      { text: "'number'", correct: false },
    ],
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    answers: [
      { text: "JSON.stringify()", correct: false },
      { text: "JSON.parse()", correct: true },
      { text: "JSON.toObj()", correct: false },
      { text: "JSON.convert()", correct: false },
    ],
  },
  {
    question: "What is the output of: Boolean(10 > 9)?",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "NaN", correct: false },
      { text: "undefined", correct: false },
    ],
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "<!-- -->", correct: false },
      { text: "//", correct: true },
      { text: "**", correct: false },
      { text: "#", correct: false },
    ],
  },
  {
    question: "How do you round the number 7.25 to the nearest integer?",
    answers: [
      { text: "Math.rnd(7.25)", correct: false },
      { text: "Math.round(7.25)", correct: true },
      { text: "round(7.25)", correct: false },
      { text: "Math.floor(7.25)", correct: false },
    ],
  },
  {
    question: "Which operator checks for both value and type equality?",
    answers: [
      { text: "==", correct: false },
      { text: "=", correct: false },
      { text: "===", correct: true },
      { text: "!=", correct: false },
    ],
  },
  {
    question: "What is the correct syntax for an 'if' statement?",
    answers: [
      { text: "if i == 5 then", correct: false },
      { text: "if (i == 5)", correct: true },
      { text: "if i = 5 then", correct: false },
      { text: "if i = 5", correct: false },
    ],
  },
  {
    question: "How do you find the number with the highest value of x and y?",
    answers: [
      { text: "Math.max(x, y)", correct: true },
      { text: "Math.ceil(x, y)", correct: false },
      { text: "top(x, y)", correct: false },
      { text: "ceil(x, y)", correct: false },
    ],
  },
  {
    question: "Which variable declaration is block-scoped?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: true },
      { text: "nothing", correct: false },
      { text: "global", correct: false },
    ],
  },
  {
    question: "What is the output of '3' == 3?",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "undefined", correct: false },
      { text: "error", correct: false },
    ],
  },
  {
    question:
      "Which array method creates a new array with the results of calling a function on every element?",
    answers: [
      { text: "forEach()", correct: false },
      { text: "map()", correct: true },
      { text: "filter()", correct: false },
      { text: "reduce()", correct: false },
    ],
  },
  {
    question: "What keyword is used to handle exceptions?",
    answers: [
      { text: "catch", correct: false },
      { text: "try", correct: true },
      { text: "error", correct: false },
      { text: "throw", correct: false },
    ],
  },
  {
    question: "Which of these is NOT a valid JavaScript data type?",
    answers: [
      { text: "Number", correct: false },
      { text: "String", correct: false },
      { text: "Float", correct: true },
      { text: "Boolean", correct: false },
    ],
  },
  {
    question: "What is the purpose of the 'this' keyword?",
    answers: [
      { text: "Refers to the current function", correct: false },
      { text: "Refers to the object it belongs to", correct: true },
      { text: "Refers to the previous variable", correct: false },
      { text: "Refers to the global window only", correct: false },
    ],
  },
  {
    question: "How do you declare an asynchronous function?",
    answers: [
      { text: "async function myFunc()", correct: true },
      { text: "function async myFunc()", correct: false },
      { text: "await function myFunc()", correct: false },
      { text: "function myFunc() async", correct: false },
    ],
  },
  {
    question: "Which method adds an element to the end of an array?",
    answers: [
      { text: "push()", correct: true },
      { text: "pop()", correct: false },
      { text: "unshift()", correct: false },
      { text: "concat()", correct: false },
    ],
  },
  {
    question: "What is a closure?",
    answers: [
      { text: "A function having access to the parent scope", correct: true },
      { text: "A variable that cannot be changed", correct: false },
      { text: "A method to close the window", correct: false },
      { text: "A loop that never ends", correct: false },
    ],
  },
  {
    question: "Which operator is the logical AND?",
    answers: [
      { text: "||", correct: false },
      { text: "&&", correct: true },
      { text: "!", correct: false },
      { text: "&", correct: false },
    ],
  },
  {
    question: "What does 'use strict' do?",
    answers: [
      { text: "Enforces stricter parsing and error handling", correct: true },
      { text: "Makes code run faster", correct: false },
      { text: "Allows undeclared variables", correct: false },
      { text: "Includes external libraries", correct: false },
    ],
  },
  {
    question: "How do you check if an array includes a specific value?",
    answers: [
      { text: "has()", correct: false },
      { text: "contains()", correct: false },
      { text: "includes()", correct: true },
      { text: "exist()", correct: false },
    ],
  },
  {
    question: "What is the output of: console.log(typeof NaN)?",
    answers: [
      { text: "'number'", correct: true },
      { text: "'NaN'", correct: false },
      { text: "'undefined'", correct: false },
      { text: "'object'", correct: false },
    ],
  },
  {
    question: "Which method combines two or more arrays?",
    answers: [
      { text: "join()", correct: false },
      { text: "concat()", correct: true },
      { text: "merge()", correct: false },
      { text: "append()", correct: false },
    ],
  },
  {
    question: "What is the default value of an uninitialized variable?",
    answers: [
      { text: "null", correct: false },
      { text: "0", correct: false },
      { text: "undefined", correct: true },
      { text: "NaN", correct: false },
    ],
  },
  {
    question: "Which function is used to parse a string to an integer?",
    answers: [
      { text: "Integer.parse()", correct: false },
      { text: "parseInt()", correct: true },
      { text: "parseInteger()", correct: false },
      { text: "toInt()", correct: false },
    ],
  },
  {
    question: "What is the spread operator syntax?",
    answers: [
      { text: "...", correct: true },
      { text: ">>>", correct: false },
      { text: "+++", correct: false },
      { text: "&&&", correct: false },
    ],
  },
  {
    question:
      "Which object is used to store data in the browser that survives page refreshes?",
    answers: [
      { text: "sessionStorage", correct: false },
      { text: "localStorage", correct: true },
      { text: "cookies", correct: false },
      { text: "cache", correct: false },
    ],
  },
  {
    question: "What is the result of: [] == []?",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "undefined", correct: false },
      { text: "error", correct: false },
    ],
  },
  {
    question: "Which method executes a function after a specified time?",
    answers: [
      { text: "setInterval()", correct: false },
      { text: "setTimeout()", correct: true },
      { text: "delay()", correct: false },
      { text: "wait()", correct: false },
    ],
  },
  {
    question: "What is the output of: 0.1 + 0.2 === 0.3?",
    answers: [
      { text: "true", correct: false },
      { text: "false", correct: true },
      { text: "undefined", correct: false },
      { text: "NaN", correct: false },
    ],
  },
  {
    question: "Which keyword is used to inherit a class?",
    answers: [
      { text: "inherits", correct: false },
      { text: "extends", correct: true },
      { text: "super", correct: false },
      { text: "using", correct: false },
    ],
  },
  {
    question: "What does the 'map' object hold?",
    answers: [
      { text: "Key-value pairs", correct: true },
      { text: "Only strings", correct: false },
      { text: "Only numbers", correct: false },
      { text: "HTML elements", correct: false },
    ],
  },
  {
    question: "Which method returns the length of a string?",
    answers: [
      { text: "size()", correct: false },
      { text: "length", correct: true },
      { text: "count()", correct: false },
      { text: "index()", correct: false },
    ],
  },
  {
    question: "What is the purpose of 'preventDefault()'?",
    answers: [
      { text: "Stops the browser from crashing", correct: false },
      { text: "Prevents the default action of an event", correct: true },
      { text: "Stops event bubbling", correct: false },
      { text: "Prevents variable reassignment", correct: false },
    ],
  },
  {
    question: "Which logical operator flips the value of a boolean?",
    answers: [
      { text: "!", correct: true },
      { text: "||", correct: false },
      { text: "&&", correct: false },
      { text: "^", correct: false },
    ],
  },
  {
    question: "What is a Promise in JavaScript?",
    answers: [
      { text: "A guarantee that code will run fast", correct: false },
      {
        text: "An object representing eventual completion of async operation",
        correct: true,
      },
      { text: "A strict variable type", correct: false },
      { text: "A function loop", correct: false },
    ],
  },
  {
    question: "Which method converts an array to a string?",
    answers: [
      { text: "toString()", correct: true },
      { text: "toText()", correct: false },
      { text: "parseString()", correct: false },
      { text: "stringify()", correct: false },
    ],
  },
  {
    question:
      "What is the scope of a variable declared with 'var' inside a function?",
    answers: [
      { text: "Global", correct: false },
      { text: "Function scope", correct: true },
      { text: "Block scope", correct: false },
      { text: "Module scope", correct: false },
    ],
  },
  {
    question: "What is the result of: '5' - 3?",
    answers: [
      { text: "2", correct: true },
      { text: "'53'", correct: false },
      { text: "NaN", correct: false },
      { text: "undefined", correct: false },
    ],
  },
];

// --- EVENT LISTENERS ---
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  if (isReviewing && currentQuestionIndex === shuffledQuestions.length - 1) {
    showResults();
    return;
  }
  currentQuestionIndex++;
  setNextQuestion();
});
restartButton.addEventListener("click", startGame);
quitButton.addEventListener("click", () => {
  clearInterval(timer);
  shuffledQuestions = shuffledQuestions.slice(0, currentQuestionIndex + 1);
  showResults();
});
reviewButton.addEventListener("click", startReview);

// --- GAME LOGIC ---

function startGame() {
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  quizInfo.classList.remove("hidden");
  quitButton.classList.remove("hidden");

  // Shuffle questions for randomness
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  userAnswers = [];
  isReviewing = false;
  score = 0;

  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);

  if (isReviewing) {
    timeText.parentElement.classList.add("hidden");
    const correctAns = shuffledQuestions[currentQuestionIndex].answers.find(
      (a) => a.correct,
    ).text;
    const userAns = userAnswers[currentQuestionIndex];

    Array.from(answerButtonsElement.children).forEach((button) => {
      button.disabled = true;
      if (button.innerText === correctAns) button.classList.add("correct");
      if (userAns === button.innerText && userAns !== correctAns)
        button.classList.add("wrong");
    });

    nextButton.classList.remove("hidden");
    nextButton.innerText =
      currentQuestionIndex === shuffledQuestions.length - 1
        ? "Finish Review"
        : "Next Question";
  } else {
    timeText.parentElement.classList.remove("hidden");
    nextButton.innerText = "Next Question";
    startTimer();
  }

  // Update Progress Bar
  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progressPercent}%`;
  questionNumberSpan.innerText = currentQuestionIndex + 1;
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn", "btn-answer");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hidden");
  clearInterval(timer);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(timer);
  const selectedButton = e.target;
  userAnswers[currentQuestionIndex] = selectedButton.innerText;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    score++;
  }

  showAnswerFeedback();
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function showResults() {
  quizScreen.classList.add("hidden");
  quizInfo.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScoreSpan.innerText = score;

  // Dynamic feedback based on score
  if (score === 50) {
    feedbackMessage.innerText = "Perfect Score! You are a JavaScript Master!";
  } else if (score > 40) {
    feedbackMessage.innerText = "Great job! You know your stuff.";
  } else if (score > 25) {
    feedbackMessage.innerText = "Not bad, but there's room for improvement.";
  } else {
    feedbackMessage.innerText = "Keep studying! You'll get there.";
  }
}

function startTimer() {
  let time = TIME_LIMIT;
  timeText.innerText = time;
  timer = setInterval(() => {
    time--;
    timeText.innerText = time;
    if (time <= 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  userAnswers[currentQuestionIndex] = null;
  showAnswerFeedback();
}

function showAnswerFeedback() {
  // Visual feedback for all buttons
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true; // Disable all buttons after selection
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hidden");
  } else {
    setTimeout(showResults, 1000); // Wait a second before showing results
  }
}

function startReview() {
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  quizInfo.classList.remove("hidden");
  quitButton.classList.add("hidden");
  isReviewing = true;
  currentQuestionIndex = 0;
  setNextQuestion();
}
