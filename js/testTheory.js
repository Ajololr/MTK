const idInLocalStorage = "ResultListForR429Test";

let testWithTips;

let testBlock;
let buttonsBlock;
let mainBlock;
let testTypeBlockRef;
let userFormRef;

let questionNumberRef;
let questionDescriptionRef;
let questionAnswersRef;

let answeredCounter;

let resultTable;
let questionNumber = 0;
let userSurname;
let userName;
let userGroup;

let currentQuestions = [];
let questions = [];

const questionResult = new Map();

window.onload = function () {
    userFormRef = document.getElementById('userForm');
    userFormRef.style.display = "none";
    testBlock = document.getElementById("questionBlock");
    testBlock.style.display = "none";
    buttonsBlock = document.getElementById("buttonsBlock");
    buttonsBlock.style.display = "none";
    resultTable = document.getElementById("tableResult");
    resultTable.style.display = "none";


    document.getElementById("show").addEventListener("click", () => {
        let resultList = JSON.parse(localStorage.getItem(idInLocalStorage));

        if (resultList !== undefined) {
            if (resultList.length !== 0) {
                showResultsForAllTimes(resultList);
            }
        }

    });
};

function initializeQuestions() {
    answeredCounter = document.getElementById("answeredCounter");
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
    let currentIndex = questions.length;
    let tempValue;
    let randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = questions[currentIndex];
        questions[currentIndex] = questions[randomIndex];
        questions[randomIndex] = tempValue;
    }
    questions.reverse();
}

function getArrayQuestions() {
    currentQuestions = questions.slice(0, 10);
}

function showQuestion() {
    let currentQuestion = currentQuestions[questionNumber];
    let answersTemplate = '';
    questionNumberRef.innerText = "Вопрос " + (questionNumber + 1);
    questionDescriptionRef.innerText = currentQuestion.question;
    currentQuestion.answers.forEach((answer, i) => {
        answersTemplate += "<li>" +
            "<input type=\"radio\" class=\"radioButton\" id=\"" + i + "\" value=\"" + i + "\" " + "style=\"margin-right: 0.5rem\"" + ">" + answer + "</li>";
    });
    questionAnswersRef.innerHTML = answersTemplate ? answersTemplate : '';
    questionNumber++;
    answeredCounter.innerHTML = questionNumber + "/10";
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
    document.getElementById('buttonsBlock').style.display = 'flex';
    document.getElementById("nextBtn").addEventListener('click', nextQuestion);
    document.getElementById('previousBtn').addEventListener('click', previousQuestion);
    document.getElementById('previousBtn').style.opacity = '50%';
}

function saveResult() {
    const radioButtonsRef = document.getElementsByClassName("radioButton");
    Array.from(radioButtonsRef).forEach(btn => {
        if (btn.checked) {
            questionResult.set(questionNumber, btn.value);
        }
    });
}

function showResultBlock() {
    mainBlock.style.display = "none";
    resultTable.style.display = "block";
    testBlock.style.display = "none";
    let result = 0;

    for (let i = 1; i < 11; i++) {
        let row = document.getElementById("question" + i);
        let tdArray = row.querySelectorAll("td");
        tdArray[0].innerText = currentQuestions[i - 1].question;
        tdArray[1].innerText = "";
        currentQuestions[i - 1].answer.forEach(function (elem) {
            tdArray[1].innerText += currentQuestions[i - 1].allAnswer[elem - 1] + "\n ";
        });
        tdArray[2].innerText = "";
        questionResult[i - 1].forEach(function (elem) {
            tdArray[2].innerText += currentQuestions[i - 1].allAnswer[elem - 1] + "\n ";
        });

        if (tdArray[1].innerText === tdArray[2].innerText) {
            result++;
        }
    }

    document.getElementById("resultMark").innerHTML = "Ваша отметка: " + result;

    let now = new Date();

    let resultObj = new UserResult(userName, group, result, now.toLocaleString("ru"));
    let resultList = JSON.parse(localStorage.getItem(idInLocalStorage));

    if (resultList === null) {
        resultList = [];
    }

    resultList.push(resultObj);
    localStorage.setItem(idInLocalStorage, JSON.stringify(resultList));
}

function showResultsForAllTimes(list) {
    let table = document.createElement("table");
    table.id = idInLocalStorage;
    table.className = "table-bordered";
    let thead = document.createElement("thead");
    thead.appendChild(createRow("th", ["ФИО", "Группа", "Результат", "Время"]));

    let tbody = document.createElement("tbody");
    list.forEach((elem) => {
        tbody.appendChild(createRow("td", [
            elem._userName,
            elem._group,
            elem._mark,
            elem._date,
        ]));
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById("mainContainer").appendChild(table);
}

function createRow(tagName, arr) {
    let row = document.createElement("tr");

    arr.forEach((elem) => {
        let tag = document.createElement(tagName);
        let p = document.createElement("p");
        p.innerHTML = elem;
        tag.appendChild(p);
        row.appendChild(tag);
    });

    return row;
}

function nextQuestion(event) {
    if (questionNumber < 10) {
        document.getElementById('previousBtn').style.opacity = '100%';
        if (questionNumber === 9) {
            document.getElementById("nextBtn").style.opacity = '50%';
        }
        saveResult();
        showQuestion();
        event.stopPropagation();
    } else {
        event.stopPropagation();
        saveResult();
        showResultBlock();
        console.log(questionResult);
    }
}

function previousQuestion(event) {
    if (questionNumber > 1) {
        document.getElementById("nextBtn").style.opacity = '100%';
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

function chooseTest(withTips) {
    testWithTips = withTips;
    testTypeBlockRef = document.getElementById("testType");
    testTypeBlockRef.style.display = "none";
    userFormRef.style.display = "flex";
}
