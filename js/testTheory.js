const idInLocalStorage = "MTK-240TestResult";
const QUESTIONS_AMOUNT = 20;

let testWithHints;
let hintActive;

let mainBlockRef;
let testTypeBlockRef;
let userFormRef;
let testBlockRef;
let buttonsBlockRef;
let resultBlockRef;

let questionNumberRef;
let questionDescriptionRef;
let questionAnswersRef;

let checkBtnRef;
let previousBtnRef;
let nextBtnRef;

let answeredCounterRef;
let resultTableBodyRef;

let hintBlockRef;
let hintBtnRef;

let questionNumber = 0;
let answeredNumber = 0;
let userSurname;
let userName;
let userGroup;

let currentQuestions = [];
let questions = [];

const questionResultMap = new Map();

window.onload = function () {
    mainBlockRef = document.getElementById("mainBlock");
    testTypeBlockRef = document.getElementById("testType");
    userFormRef = document.getElementById('userForm');
    testBlockRef = document.getElementById("testBlock");
    buttonsBlockRef = document.getElementById("buttonsBlock");
    resultBlockRef = document.getElementById("resultBlock");
    hintBlockRef = document.getElementById("hintBlock");

    mainBlockRef.removeChild(userFormRef);
    mainBlockRef.removeChild(testBlockRef);
    mainBlockRef.removeChild(buttonsBlockRef);
    mainBlockRef.removeChild(resultBlockRef);
    mainBlockRef.removeChild(hintBlockRef);
};



function initializeQuestions() {
    $.getJSON("../sources/questions.json", function (data) {
        $.each(data, function (key, value) {
            questions.push({
                question: value.question,
                answers: value.answers,
                correctAnswer: value.correctAnswer,
                hintText: value.hintText
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
    questionAnswersRef.innerHTML = "";
    questionNumber++;
    questionNumberRef.innerText = "Вопрос " + (questionNumber);
    questionDescriptionRef.innerText = currentQuestion.question;
    currentQuestion.answers.forEach((answer, i) => {
        const answerRef = document.createElement("li");
        const radioBtnRef = document.createElement("input");
        radioBtnRef.setAttribute("type", "radio");
        radioBtnRef.setAttribute("class", "radio-button");
        radioBtnRef.setAttribute("name", "radio");
        radioBtnRef.setAttribute("id", i);
        radioBtnRef.setAttribute("value", i);
        answerRef.appendChild(radioBtnRef);
        answerRef.append(answer);
        questionAnswersRef.appendChild(answerRef);
    });
    if (questionResultMap.has(questionNumber)) {
        preselectAnswer(questionResultMap.get(questionNumber));
        if (testWithHints) {
            checkBtnRef.disabled = false;
        }
    } else if (testWithHints){
        checkBtnRef.disabled = true;
        if (hintActive) {
            mainBlockRef.removeChild(hintBlockRef);
            hintActive = false;
        }
    }
    addEventsForAnswers();
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

function addEventsForAnswers() {
    const answersRef = questionAnswersRef.children;
    Array.from(answersRef).forEach(answer => {
        const radioBtnRef = answer.children[0];
        radioBtnRef.addEventListener("click", () => {
            testWithHints ? checkBtnRef.disabled = false : '';
            !questionResultMap.has(questionNumber) ? answeredCounterRef.innerHTML = ++answeredNumber + "/20" : '';
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
    mainBlockRef.removeChild(userFormRef);
    userFormRef = null;

    initializeQuestions();

    mainBlockRef.appendChild(testBlockRef);
    mainBlockRef.appendChild(buttonsBlockRef);

    answeredCounterRef = document.getElementById("answeredCounter");
    questionNumberRef = document.getElementById("questionNumber");
    questionDescriptionRef = document.getElementById("questionDescription");
    questionAnswersRef = document.getElementById("questionAnswers");
    checkBtnRef = document.getElementById("checkBtn");
    hintBtnRef = document.getElementById("hintBtn");
    previousBtnRef = document.getElementById('previousBtn');
    nextBtnRef = document.getElementById("nextBtn");

    if (testWithHints) {
        checkBtnRef.disabled = true;
    } else {
        buttonsBlockRef.removeChild(checkBtnRef);
        buttonsBlockRef.removeChild(hintBtnRef);
        checkBtnRef = null;
        hintBtnRef = null;
    }
    nextBtnRef.addEventListener('click', nextQuestion);
    previousBtnRef.addEventListener('click', previousQuestion);
    previousBtnRef.style.opacity = '50%';
}

function showResultBlock() {
    mainBlockRef.removeChild(testBlockRef);
    testBlockRef = null;
    mainBlockRef.removeChild(buttonsBlockRef);
    testBlockRef = null;
    if (hintActive) {
        mainBlockRef.removeChild(hintBlockRef);
        hintActive = false;
        hintBlockRef = null;
    }
    mainBlockRef.appendChild(resultBlockRef);

    document.getElementById("resultName").innerText = userSurname + " " + userName;
    document.getElementById("resultGroup").innerText = userGroup;
    document.getElementById("resultMark").innerText = calculateMark().toString();

    resultTableBodyRef = document.getElementById("resultTableBody");
    createResultTable();
}

function calculateMark() {
    let result = 0;
    for (let i = 0; i < QUESTIONS_AMOUNT; i++) {
        checkCorrectAnswer(i) ? result++ : '';
    }
    return Math.round(10 * (result / QUESTIONS_AMOUNT));
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
    if (questionNumber < QUESTIONS_AMOUNT) {
        previousBtnRef.style.opacity = '100%';
        if (questionNumber === QUESTIONS_AMOUNT - 1) {
            nextBtnRef.innerText = "Закончить тест";
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
        nextBtnRef.innerText = "Следующий вопрос >";
        questionNumber -= 2;
        showQuestion();
        if (questionNumber === 1) {
            previousBtnRef.style.opacity = '50%';
        }
        event.stopPropagation();
    } else {
        previousBtnRef.style.opacity = '50%';
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
    mainBlockRef.removeChild(testTypeBlockRef);
    testTypeBlockRef = null;
    mainBlockRef.appendChild(userFormRef);
}

function checkAnswer() {
    const answersRef = questionAnswersRef.children;
    const currentValue = questionResultMap.get(questionNumber);
    const correctValue = currentQuestions[questionNumber - 1].correctAnswer;
    if (currentValue === correctValue - 1) {
        answersRef[currentValue].className = "correct-answer";
    } else {
        answersRef[currentValue].className = "incorrect-answer";
        answersRef[correctValue - 1].className = "correct-answer";
    }
}

function showHint() {
    hintBlockRef.children[1].innerText = currentQuestions[questionNumber - 1].hintText;
    mainBlockRef.insertBefore(hintBlockRef, buttonsBlockRef);
    hintActive = true;
}

function hideHint() {
    hintBlockRef.children[1].innerText = "";
    mainBlockRef.removeChild(hintBlockRef);
    hintActive = false;
}
