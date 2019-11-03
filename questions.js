var startButton = document.getElementById("start-btn")
var nextButton = document.getElementById("next-btn")
var questionContainerElement = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerButtonsElement = document.getElementById("answer-buttons")

var shuffledQuestions, currentQuestionIndex

startButton.addEventListener("click", startGame)
nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add("hide")
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove("hide")
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement("button")
    button.innerText = answer.text
    button.classList.add("btn")
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener("click", selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add("hide")
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide")
  } else {
    startButton.innerText = "Restart"
    startButton.classList.remove("hide")
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct")
  element.classList.remove("wrong")
}

var questions = [
  {
    question: "Is an array an object?",
    answers: [
      { text: "Yes", correct: true },
      { text: "No", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cats Style Stuff", correct: false },
      { text: "Correcting Scummy Signs", correct: false },
      { text: "Catastrophic Syntax Supression", correct: false },
      { text: "Cascading Syle sheets", correct: true }
    ]
  },
  {
    question: "Is coding fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "YES", correct: true },
      { text: "Nope", correct: false },
      { text: "Can't be sure", correct: false }
    ]
  },
  {
    question: "Which programming language is standard for web applications?",
    answers: [
      { text: "Javascript", correct: true },
      { text: "Python", correct: false },
      { text: "C++", correct: false },
      { text: "SQL", correct: false }  
      
    ]
  }
]