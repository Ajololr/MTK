const idInLocalStorage = "ResultListForR429Test";

let questionArray;

let testStarted = false;

let testBlock;
let mainBlock;
let resultBlock;
let startTheoryBtn;
let resultTable;
let questionNumber = 0;
let userSurname;
let userName;
let userGroup;

let currentQuestions = [];
let questions = [];

let questionResult = [];

let timer;

window.onload = function () {
    testBlock = document.getElementById("questionBlock");
    testBlock.style.display = "none";
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
    questions.push({
        question: "Напряжение сети переменного тока, необходимое для питания МТК-240Б",
        answers: [
            "210 В",
            "220 В",
            "230 В",
            "240 В",
            "310 В"
        ],
        correctAnswer: [
            3
        ]
    });
    questions.push({
        question: "Напряжение сети постоянного тока, необходимое для питания МТК-240Б",
        answers: [
            "12-24 В",
            "32-48 В",
            "48-60 В",
            "60-72 В",
            "310 В"
        ],
        correctAnswer: [3]
    });
    questions.push({
        question: "Диапазон рабочих температур МТК-240Б",
        answers: [
            "-10..+40 ºС",
            "-30..+30 ºС",
            "-15..+50 ºС",
            "-17..+45 ºС",
            "-25..+50 ºС"
        ],
        correctAnswer: [1]
    });
    questions.push({
        question: "Что обеспечивается МТК-240Б с помощью оборудования кроссовой коммутации?",
        answers: [
            "диагностика, мониторинг и установка режимов работы входящего в состав комплекса оборудования",
            "подключение до 16 аналоговых двухпроводных защищенных телефонных аппаратов",
            "ввод исходных данных (коды, нумерация и т.д.) для АТСЭ ФМС",
            "выделение цифровых потоков Е-1 и трафика Ethernet",
            "комплексная защита по току и напряжению всех линий"
        ],
        correctAnswer: [5]
    });
    questions.push({
        question: "Что обеспечивается МТК-240Б с помощью аппаратуры криптографической защиты информации?",
        answers: [
            "автоматическая телефонная внутренняя связь, исходящая, входящая и транзитная связь с абонентами других АТС сети связи",
            "шифрование цифрового потока Е1 с возможностью выделения трафика Ethernet",
            "подключение к взаимодействующим узлам связи или пунктам выделения каналов, в т.ч. РУЭС сети электросвязи общего пользования и т.д. по медному или волоконно-оптическому кабелю связи",
            "техническая защита информации от несанкционированного доступа, а также от утечек по каналам побочных электромагнитных излучений и наводок",
            "коммутация и подключение абонентов и пользователей"
        ],
        correctAnswer: [2]
    });
    questions.push({
        question: "Что обеспечивается МТК-240Б С помощью аппаратуры цифровых систем передачи (ЦСП)?",
        answers: [
            "подключение до 16 аналоговых двухпроводных защищенных телефонных аппаратов",
            "комплексная защита по току и напряжению всех линий",
            "работа АТСЭ ФМС в режиме коммутатора ручного обслуживания",
            "коммутация и подключение абонентов и пользователей",
            "подключение к взаимодействующим узлам связи или пунктам выделения каналов, в т.ч. РУЭС сети электросвязи общего пользования и т.д. по медному или волоконно-оптическому кабелю связи"
        ],
        correctAnswer: [5]
    });
    questions.push({
        question: "Что обеспечивается МТК-240Б С помощью встроенной панельной ПЭВМ?",
        answers: [
            "подключение к взаимодействующим узлам связи или пунктам выделения каналов, в т.ч. РУЭС сети электросвязи общего пользования и т.д. по медному или волоконно-оптическому кабелю связи",
            "коммутация и подключение абонентов и пользователей",
            "выделение цифровых потоков Е-1 и трафика Ethernet",
            "работа АТСЭ ФМС в режиме коммутатора ручного обслуживания",
            "взаимодействие с другими АТС по двум защищенным цифровым потокам Е1 по стандарту G.703 с поддержкой сигнализации типа 1ВСК, 2ВСК и EDSS-1"
        ],
        correctAnswer: [4]
    });
    questions.push({
        question: "Масса полностью укомплектованного контейнера (не более)",
        answers: [
            "20 кг",
            "30 кг",
            "50 кг",
            "60 кг",
            "70 кг"
        ],
        correctAnswer: [3]
    });
    questions.push({
        question: "Масса кейса с АКБ (не более)",
        answers: [
            "5 кг",
            "10 кг",
            "15 кг",
            "20 кг",
            "25 кг"
        ],
        correctAnswer: [3]
    });
    questions.push({
        question: "Масса контейнера для телефонных аппаратов (ТА) (не более)",
        answers: [
            "10 кг",
            "20 кг",
            "30 кг",
            "40 кг",
            "50 кг"
        ],
        correctAnswer: [3]
    });
    questions.push({
        question: "Диапазон температур при хранении и транспортировании в ударопрочных, пыле- и влагозащищенных контейнере и кейсах со степенью защиты IP-67",
        answers: [
            "-30..+50 ºС",
            "-25..+50 ºС",
            "-40..+40 ºС",
            "-40..+60 ºС",
            "-50..+65 ºС"
        ],
        correctAnswer: [5]
    });
    questions.push({
        question: "Что не входит в состав МТК-240Б?",
        answers: [
            "аппаратура цифровых систем передачи Орион-3",
            "место для установки аппаратуры АЕ1-600А",
            "панель коммутации",
            "модуль доступа МД1-1Р",
            "ЗИП-О"
        ],
        correctAnswer: [4]
    });
    questions.push({
        question: "Что не входит в состав контейнера для ТА МТК-240Б?",
        answers: [
            "кейс",
            "преобразователь напряжения ПН-24/48",
            "телефонный аппарат типа «Нефрит-2 АТС»",
            "витая пара 20 м",
            "провод заземления 5 м"
        ],
        correctAnswer: [2]
    });
    questions.push({
        question: "Предназначение МТК-240Б",
        answers: [
            "Для оперативной организации цифровой проводной линии связи, образования и шифрования/дешифрования канала Е1.",
            "Для оперативной организации цифровой проводной линии связи, образования и шифрования/дешифрования канала Е1, а также развертывания засекреченных сетей передачи данных, видеоконференцсвязи и автоматической телефонной связи на стационарном или подвижном пункте управления.",
            "Для оперативной организации цифровой проводной линии связи, а также развертывания засекреченных сетей передачи данных, видеоконференцсвязи и автоматической телефонной связи на стационарном или подвижном пункте управления.",
            "Для организации связи и передачи цифровой информации на расстоянии прямой видимости на стационарном или подвижном пункте управления, а также оперативной организации цифровой проводной линии связи, образования и шифрования/дешифрования канала Е1.",
            "Для образования и шифрования/дешифрования канала Е1, а также развертывания засекреченных сетей передачи данных, видеоконференцсвязи и автоматической телефонной связи на стационарном или подвижном пункте управления."
        ],
        correctAnswer: [2]
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
    document.getElementById("questionNumber").innerText = "Вопрос " + (questionNumber + 1);
    document.getElementById("questionDescription").innerText = currentQuestion.question;
    currentQuestion.answers.forEach((answer, i) => {
        answersTemplate += "<li>" + "<input type=\"radio\" class=\"radioButton\" id=\"" + i + "\" value=\"" + i + "\" >" + answer + "</li>";
    });
    document.getElementById('questionAnswers').innerHTML = answersTemplate ? answersTemplate : '';
    questionNumber++;
}


function startTest() {
    userSurname = document.getElementById("userSurname").value;
    userName = document.getElementById("userName").value;
    userGroup = document.getElementById("userGroup").value;


    if (!userName || !userSurname || !userGroup) {
        alert("Заполните все поля");
        return;
    }

    initializeQuestions();
    mixArrayQuestions();
    getArrayQuestions();

    document.getElementById('userForm').style.display = 'none';

    showQuestion();

    document.getElementById('questionBlock').style.display = 'flex';
    document.getElementById("nextBtn").addEventListener('click', nextQuestion);
    document.getElementById('previousBtn').addEventListener('click', previousQuestion);
    document.getElementById('previousBtn').style.opacity = '50%';
}

function saveResult() {
    radioBtns = document.getElementsByClassName("radioButton");
    let results = [];
    for (let i = 0; i < radioBtns.length; i++) {
        if (radioBtns[i].checked) {
            results.push(radioBtns[i].value);
        }
    }
    questionResult.push(results);
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
