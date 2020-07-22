const idInLocalStorage = "ResultListForR429Test";

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

let resultTable;
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
    currentQuestions = questions.slice(0, 11);
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
    testWithHints ? addAnswersCheckForTestWithHints() : '';
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
            document.getElementById("checkBtn").disabled = false;
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

function setAnswerBackground(element, className) {
    element.className = "";
}
