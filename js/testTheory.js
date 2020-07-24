const idInLocalStorage = "MTK-240TestResult";
const QUESTIONS_AMOUNT = 10;

let testWithHints;

let testBlock;
let buttonsBlockRef;
let mainBlock;
let testTypeBlockRef;
let userFormRef;

let questionNumberRef;
let questionDescriptionRef;
let questionAnswersRef;

let answeredCounterRef;

let resultRef;
let resultTableBodyRef;
let questionNumber = 0;
let answeredNumber = 0;
let userSurname;
let userName;
let userGroup;

let currentQuestions = [];
let questions = [];

const questionResultMap = new Map();

window.onload = function () {
    userFormRef = document.getElementById('userForm');
    userFormRef.style.display = "none";
    testBlock = document.getElementById("questionBlock");
    testBlock.style.display = "none";
    buttonsBlockRef = document.getElementById("buttonsBlock");
    buttonsBlockRef.style.display = "none";
    resultRef = document.getElementById("result");
    resultRef.style.display = "none";
};

function initializeQuestions() {
    answeredCounterRef = document.getElementById("answeredCounter");
    questionNumberRef = document.getElementById("questionNumber");
    questionDescriptionRef = document.getElementById("questionDescription");
    questionAnswersRef = document.getElementById("questionAnswers");

    $.getJSON("../sources/questions.json", function (data) {
        $.each(data, function (key, value) {
            questions.push({
                question: value.question,
                answers: value.answers,
                correctAnswer: value.correctAnswer
            });
        });
        mixArrayQuestions();
        getArrayQuestions();
        showQuestion();
    });
}

function mixArrayQuestions() {
    questions = shuffle(questions);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getArrayQuestions() {
    currentQuestions = questions.slice(0, QUESTIONS_AMOUNT + 1);
}

function showQuestion() {
    let currentQuestion = currentQuestions[questionNumber];
    let answersTemplate = '';
    questionNumber++;
    questionNumberRef.innerText = "Вопрос " + (questionNumber);
    questionDescriptionRef.innerText = currentQuestion.question;
    currentQuestion.answers.forEach((answer, i) => {
        answersTemplate += "<li>" +
            "<input type=\"radio\" class=\"radioButton\" name=\"radio\" id=\"" + i + "\" value=\"" + i + "\" " + "style=\"margin-right: 0.5rem\"" + ">" + answer + "</li>";
    });
    document.getElementById("checkBtn").disabled = !(testWithHints && questionResultMap.has(questionNumber));
    questionAnswersRef.innerHTML = answersTemplate ? answersTemplate : '';
    questionResultMap.has(questionNumber) ? preselectAnswer(questionResultMap.get(questionNumber)) : '';
    addAnswersCheckForTestWithHints();
}

function preselectAnswer(value) {
    const answersRef = questionAnswersRef.children;
    Array.from(answersRef).forEach(answer => {
        const radioBtnRef = answer.children[0];
        if (radioBtnRef.value === value) {
            radioBtnRef.checked = true;
        }
    });
}

function addAnswersCheckForTestWithHints() {
    const answersRef = questionAnswersRef.children;
    Array.from(answersRef).forEach(answer => {
        const radioBtnRef = answer.children[0];
        radioBtnRef.addEventListener("click", () => {
            testWithHints ? document.getElementById("checkBtn").disabled = false : '';
            !questionResultMap.has(questionNumber) ? answeredCounterRef.innerHTML = ++answeredNumber + "/10" : '';
            questionResultMap.set(questionNumber, radioBtnRef.value);
        });
    });
}


function startTest() {
    userSurname = document.getElementById("userSurname").value;
    userName = document.getElementById("userName").value;
    userGroup = document.getElementById("userGroup").value;


    if (!userName || !userSurname || !userGroup) {
        alert("Заполните все поля");
        return;
    }

    document.getElementById('userForm').style.display = 'none';

    initializeQuestions();

    document.getElementById('questionBlock').style.display = 'flex';
    buttonsBlockRef.style.display = 'flex';
    if (testWithHints) {
        document.getElementById("checkBtn").disabled = true;
    } else {
        document.getElementById("checkBtn").style.display = 'none';
    }
    document.getElementById("nextBtn").addEventListener('click', nextQuestion);
    document.getElementById('previousBtn').addEventListener('click', previousQuestion);
    document.getElementById('previousBtn').style.opacity = '50%';
}

function showResultBlock() {
    document.getElementById("resultName").innerText = userSurname + " " + userName;
    document.getElementById("resultGroup").innerText = userGroup;
    document.getElementById("resultMark").innerText = calculateMark().toString();

    resultTableBodyRef = document.getElementById("resultTableBody");
    createResultTable();

    testBlock.style.display = "none";
    buttonsBlockRef.style.display = "none";
    resultRef.style.display = "flex";
}

function calculateMark() {
    let result = 0;
    for (let i = 0; i < QUESTIONS_AMOUNT; i++) {
        checkCorrectAnswer(i) ? result++ : '';
    }
    return 10 * (result / QUESTIONS_AMOUNT);
}

function createResultTable() {
    for (let i = 0; i < QUESTIONS_AMOUNT; i++) {
        const row = document.createElement("tr");

        const numCol = document.createElement("td");
        numCol.innerText = (i + 1).toString();
        const statusCol = document.createElement("td");
        const statusImg = document.createElement("span");
        statusImg.setAttribute("class", checkCorrectAnswer(i) ? "question-status-true" : "question-status-false");
        statusCol.appendChild(statusImg);
        const scoreCol = document.createElement("td");
        scoreCol.innerText = checkCorrectAnswer(i) ? "1" : "0";
        row.appendChild(numCol);
        row.appendChild(statusCol);
        row.appendChild(scoreCol);
        resultTableBodyRef.appendChild(row);
    }
}

function checkCorrectAnswer(questionNumber) {
    if (questionResultMap.has(questionNumber + 1)) {
        const correctAnswer = currentQuestions[questionNumber].correctAnswer;
        return (correctAnswer - 1).toString() === questionResultMap.get(questionNumber + 1)
    }
    return false;
}


function nextQuestion(event) {
    if (questionNumber < 10) {
        document.getElementById('previousBtn').style.opacity = '100%';
        if (questionNumber === 9) {
            document.getElementById("nextBtn").innerText = "Закончить тест";
        }
        showQuestion();
        event.stopPropagation();
    } else {
        event.stopPropagation();
        showResultBlock();
    }
}

function previousQuestion(event) {
    if (questionNumber > 1) {
        document.getElementById("nextBtn").innerText = "Следующий вопрос >";
        questionNumber -= 2;
        showQuestion();
        if (questionNumber === 1) {
            document.getElementById('previousBtn').style.opacity = '50%';
        }
        event.stopPropagation();
    } else {
        document.getElementById('previousBtn').style.opacity = '50%';
    }
}

function UserResult(userName, group, mark, date) {
    this._userName = userName;
    this._group = group;
    this._mark = mark;
    this._date = date;
}

function chooseTest(withHints) {
    testWithHints = withHints;
    testTypeBlockRef = document.getElementById("testType");
    testTypeBlockRef.style.display = "none";
    userFormRef.style.display = "flex";
}

function checkAnswer() {
    const answersRef = questionAnswersRef.children;
    const currentValue = questionResultMap.get(questionNumber);
    const correctValue = currentQuestions[questionNumber - 1].correctAnswer;
    if (currentValue === correctValue - 1) {
        answersRef[currentValue].className = "bg-success";
    } else {
        answersRef[currentValue].className = "bg-danger";
        answersRef[correctValue - 1].className = "bg-success";
    }
}

function showHint() {

}
