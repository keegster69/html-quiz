const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions= [
    {
        question:"What is Keegans dog's name?",
        answers: [
            {text: "Bailey", correct:false},
            {text: "Roofus", correct: false},
            {text: "David Duke", correct: false},
            {text: "Stir Fry", correct: true}
        ],
    },
    {
        question:"What is Keegans favorite story game?",
        answers: [
            {text:"RDR2", correct:true},
            {text:"Hogwarts Legacy", correct: false},
            {text:"Cyberpunk 2077", correct: false},
            {text:"Detroit Become Human", correct: false},
        ]
    },
    {
        question:"What club has Keegan NOT been a part?",
        answers: [
            {text:"Cheese Club", correct: true},
            {text:"Quantum Club", correct: false},
            {text:"Visual Arts Club", correct: false},
            {text:"Stocks Club", correct: false},
        ]
    },
    {
        question:"What is Keegans favorite childhood book series?",
        answers: [
            {text:"Harry Potter", correct: false},
            {text:"Percy Jackson", correct: true},
            {text:"Magic Tree house", correct: false},
            {text:"Diary of a Wimpy Kid", correct: false},
        ],
    },
    {
        question:"Where has Keegan been approximately 16 times?",
        answers: [
            {text:"Vancouver", correct: false},
            {text:"Mexico", correct: false},
            {text:"Maui", correct: true},
            {text:"France", correct: false},
        ]
    },
    {
        question:"What drink does Keegan carry in a flask?",
        answers: [
            {text:"Pink Whitney", correct:false},
            {text:"Fireball", correct:true},
            {text:"Milk", correct:false},
            {text:"Vodka",correct:false},
        ],
    },
    {
        question:"What dating site has Keegan unfortunately been on?",
        answers: [
            {text:"Tinder", correct:false},
            {text:"Bumble", correct:false},
            {text:"Grindr", correct:false},
            {text:"Hinge",correct:true}
        ]
    },
    {
        question:"What is Keegans favorite illegitimate ski run?",
        answers: [
            {text:"Destroyer",correct: false},
            {text:"K2", correct: false},
            {text:"Zootopia",correct:false},
            {text:"Randy's Run", correct: true},
        ]
    },
    {
        question:"Which of Keegan's friends is now on his girlfriend's leash?",
        answers: [
            {text:"Limtown", correct:true},
            {text:"Thickolicious",correct:false},
            {text:"Drossdude",correct:false},
            {text:"BBomba",correct:false}
        ]
    },
    {
        question:"Which of Keegans friends did this quiz first?",
        answers: [
            {text:"Thickolicious", correct: false},
            {text:"Bomba", correct: true},
            {text:"Limtown", correct: false},
            {text:"Stir Fry",correct: false}
        ]
    },
];
let currentQuestionIndex = 0;
let score = 0
let answersDisabled = false

 totalQuestionsSpan.textContent = quizQuestions.length;
 maxScoreSpan.textContent = quizQuestions.length

 startButton.addEventListener("click", startQuiz)
 restartButton.addEventListener("click", restartQuiz)
 function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    startScreen.classList.remove("active");
    resultScreen.classList.remove("active");
    quizScreen.classList.add("active");
    showQuestion();
 }
 function showQuestion(){
    answersDisabled = false
    const currentQuestion = quizQuestions[currentQuestionIndex]
    currentQuestionSpan.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = "";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("answer-btn")
        button.dataset.correct = answer.correct
        button.addEventListener("click",selectAnswer)
        answersContainer.appendChild(button)
    });
 }
function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}
function showResults() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")
    finalScoreSpan.textContent = score;
    const percentage = (score/quizQuestions.length) * 100
    if(percentage === 100) {
        resultMessage.textContent = "Thick Nick, text me for your reward";
    } else if (percentage >=80){ 
        resultMessage.textContent = "Damn ok! you know me decently";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Alright maybe know me a little better thickolicious";
    } else {
        resultMessage.textContent = "Maybe talk to me a little more!";
    }
}
 function restartQuiz(){
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
 }