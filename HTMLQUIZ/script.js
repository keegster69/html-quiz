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
        question:"What is Keegans dog's name",
        answers: [
            { text: "Bailey", correct:false},
            {text: "Roofus", correct: false},
            {text: "David Duke", correct: false},
            {text: "Stir Fry", correct: true}
        ],
    },
    {
        question:"What is Keegans favorite story game",
        answers: [
            {text:"rdr2", correct:true},
            {text:"Hogwarts Legacy", correct: false},
            {text:"Cyberpunk 2077", correct: false},
            {text:"Detroit Become Human", correct: false},
        ]
    },
    {
        question:"What club has Keegan NOT been a part",
        answers: [
            {text:"Cheese Club", correct: true},
            {text:"Quantum Club", correct: false},
            {text:"Visual Arts Club", correct: false},
            {text:"Stocks Club", correct: false},
        ]
    },
    {
        question:"What is Keegans favorite childhood book series",
        answers: [
            {text:"Harry Potter", correct: false},
            {text:"Percy Jackson", correct: true},
            {text:"Magic Tree house", correct: false},
            {text:"Diary of a Wimpy Kid", correct: false},
        ],
    },
    {
        question:"Where has Keegan been approximately 16 times",
        answers: [
            {text:"Vancouver", correct: false},
            {text:"Mexico", correct: false},
            {text:"Maui", correct: true},
            {text:"France", correct: false},
        ]
    },
    {
        question:"Which of Keegans friends is mostly likely to do this quiz",
        answers: [
            {text:"Brayden", correct: true},
            {text:"BBomba", correct: true},
            {text:"Bombetty", correct: true},
            {text:"Brayden middlename Bomba", correct: true},
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
        resultMessage.textContent = "Good Boy Brayden, text me for your reward";
    } else if (percentage >=80){ 
        resultMessage.textContent = "Damn ok! you know me decently";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Alright maybe know me a little better";
    } else {
        resultMessage.textContent = "Maybe talk to me a little more!";
    }
}
 function restartQuiz(){
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
    startQuiz();
 }