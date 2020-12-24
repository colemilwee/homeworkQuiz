const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
var isDisplayed = false

clear.addEventListener('click', clearHighScore)
retake.addEventListener('click', reDo)
submitInit.addEventListener('click', addHighScores)
a1.addEventListener('click', function (event) {
    highRender(event)
})


let questions = [
    {
        question: "What is the backbone of the internet",
        choiceA: "javascript",
        choiceB: "html",
        choiceC: "css",
        choiceD: "bootstrap",
        correct: "A"
    }, {
        question: "How would you make a list in html",
        choiceA: "br",
        choiceB: "li",
        choiceC: "make the code under it",
        choiceD: "use css",
        correct: "B"
    }, {
        question: "What is css used for",
        choiceA: "to make the site function",
        choiceB: "to store data",
        choiceC: "to make the site formatted and look pretty",
        choiceD: "to write java",
        correct: "C"
    }, {
        question: "where do you link your java to your html page",
        choiceA: "on the top",
        choiceB: "in header",
        choiceC: "at the bottom",
        choiceD: "anywhere you want",
        correct: "C"
    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 160;
const gaugeWidth = 150;
let TIMER;
let score = 0;


function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>" + q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click", startQuiz);


function startQuiz() {
    isDisplayed = false
    start.style.display = "none";
    instructions.style.display = "none";
    header.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter, 1000);
}

function renderProgress() {
    for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {

    }
}



function renderCounter() {
    if (count > 0) {
        counter.innerHTML = count;
        count--;
    } else {
        counter.innerHTML = "";
        clearInterval(TIMER);
        scoreRender();
    }
}



function checkAnswer(answer) {
    if (answer == questions[runningQuestion].correct) {

        score++;

        answerIsCorrect();
    } else {

        answerIsWrong();
    }
    if (runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    } else {

        clearInterval(TIMER);
        scoreRender();
    }
}


function answerIsCorrect() {

}


function answerIsWrong() {

    count = count - 20;
    counter.innerHTML = count;
}

function highRender() {
    if (isDisplayed === false) {
        isDisplayed = true
        clearInterval(TIMER);
        start.style.display = "none";
        instructions.style.display = "none";
        header.style.display = "none";
        question.style.display = "none";
        counter.innerHTML = "";
        scoreDiv.style.display = "none";
        choices.style.display = "none";
        hslist = document.createElement('ol')
        hslist.id = 'hscores'
        highScores.splice(5)
        hslist.innerHTML = highScores
            .map(score => {
                return `<li class="high-score">${score.initials} :  ${score.score}</li>`;
            }).join("")
        scoreShowing.appendChild(hslist)
        retake.style.display = "block";
        clear.style.display = "block";
    }
}

function clearHighScore() {
    hslist.innerHTML = ""

}

function reDo() {
    location.reload()
}



function addHighScores() {

    initialsForm.style.display = "block";

    initials = document.getElementById('initials').value;
    if (initials.length > 0 && initials.length < 5) {
        ;
        initialsForm.style.display = 'none';
        highScores.push({ score: score, initials: initials.toUpperCase() });
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem('highScores', JSON.stringify(highScores));
        highScores.splice(5);
        console.log(highScores[0])
        highRender();
    }

}




function scoreRender() {
    quiz.style.display = "none";
    counter.innerHTML = "";
    scoreDiv.style.display = "block";


    addHighScores()


    const scorePerCent = Math.round(100 * score / questions.length);





    scoreDiv.innerHTML += "You scored " + scorePerCent + "% you can try again or put in your highscore";
}




