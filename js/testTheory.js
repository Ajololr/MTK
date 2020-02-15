const idInLocalStorage = "ResultListForR429Test";

var questionArray;

var testStarted = false;

var testBlock;
var mainBlock;
var resultBlock;
var startTheoryBtn;
var resultTable;
var questionNumber = 0;
var userName;
var group;

var activeQuestion = [];
var questions = [];

var questionResult = [];

var timer;

function mixArrayQuestions() {
    var currentIndex = questions.length;
    var tempValue;
    var randomIndex;
    while (0 !== currentIndex){
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = questions[currentIndex];
        questions[currentIndex] = questions[randomIndex];
        questions[randomIndex] = tempValue;
    }
    questions.reverse();
}

function takeArrayQuestions() {
    activeQuestion = questions.slice(0,10);
}

function initializeQuestions() {
    questions.push({
        question: "Сколько цифровых потоков имеет возможность передавать ЦРРС Р-429?",
        allAnswer: ["3", "4", "16", "1", "3"],
        answer: [4]
    });
    questions.push({
        question: "Какие конфигурации системы поддерживает ЦРРС Р-429?",
        allAnswer: ["1+0", "1+1", "2+0", "2+1", "2+1 горячий резерв"],
        answer: [1, 2]
    });
    questions.push({
        question: "Укажите правильный диапазон рабочих частот станции",
        allAnswer: ["238-480МГц", "1.5-60МГц", "80-120 МГц", "248-480МГц", "160-340МГц"],
        answer: [1]
    });
    questions.push({
        question: "Что из приведенного ниже списка не относится к предназначению ЦРРС Р-429",
        allAnswer: ["для передачи цифровой информации с пропускной способностью основного потока 2048 кбит/с. " +
        "При этом поддерживаются конфигурации системы \"1+0\" (без резерва) и \"1+1\" с резервированием ствола",
            "для передачи 6 или 12 каналов в дуплексном цифровом режиме", "для построения беспроводных сетей связи прямой " +
            "видимости для передачи цифровой информации в дуплексном режиме",
            "для эксплуатации в стационарных и подвижных объектах (на колесной транспортной базе) без работы в движении.",
            "для передачи основного цифрового потока со скорость 2038 кбит/с"],
        answer: [2]
    });
    questions.push({
        question: "Где происходит выделение тактовой частоты и выполняется перекодирование сигнала в код NRZ?",
        allAnswer: ["В модуле доступа МД1-1Р",
            "В приемо-предающем устройстве",
            "На выходе антенны",
            "На приеме",
            "На передаче"],
        answer: [1]
    });
    questions.push({
        question: "Какой метод испльзуется для разделения канало на прием и передачу в ЦРРС Р-429",
        allAnswer: ["Временное разделение каналов",
            "Частотное разделение каналов",
            "Кодовое разделение каналов",
            "Спектральное разделение каналов",
            "Фазово-временное разделение"],
        answer: [1]
    });
    questions.push({
        question: "Где происходит усиление, восставление формы цифрового потока, происходит демультиплексирование и восстановление тактовой частоты?",
        allAnswer: ["В эквиваленте антенны",
            "На выходе передатчиков",
            "В модуле доступа МД1-1Р",
            "На приеме",
            "На передаче"],
        answer: [3]
    });
    questions.push({
        question: "В состав выносного оборудования входит следующее оборудование (укажите верные варианты ответа):",
        allAnswer: ["Преобразователь напряжения ПН 24/48",
            "Антенна «В»",
            "Устройство приемо-передающее (2 шт)",
            "Кабель снижения",
            "Антенна 2Б11"],
        answer: [2,3,5]
    });
    questions.push({
        question: "Укажите верные функции , которые выполняет ППУ:",
        allAnswer: ["Преобразование промежуточной частоты, усиление сигнала в трактах приема и передачи;",
            "Модуляцию и демодуляцию СВЧ сигнала",
            "Регенерацию, скремблирование и кодирование цифрового потока;",
            "Фильтрацию внеполосного излучения в тракте передачи и подавление побочных каналов приема;",
            "Объединение трактов приема и передачи в общий антенный интерфейс."],
        answer: [1,2,3,4,5]
    });
    questions.push({
        question: "Шаг сетки частот ППУ ЦРРС Р-429 составляет",
        allAnswer: ["5 МГц",
            "1 МГц",
            "1.5 МГц",
            "2 МГц",
            "5 МГц"],
        answer: [2]
    });
    questions.push({
        question: "Коэффициент шума приемника ППУ составляет?",
        allAnswer: ["6 дБм",
            "7 дБм",
            "10 дБм",
            "4 дБм",
            "9 дБм"],
        answer: [1]
    });
    questions.push({
        question: "В состав ППУ ЦРРС Р-429 входят (укажите верные варинта ответа):",
        allAnswer: ["Блок питания",
            "Кабель снижения",
            "Модем",
            "Радиоблок",
            "Блок динамической защиты"],
        answer: [1,3,4]
    });
    questions.push({
        question: "Укажите правильный диапазон работы Антенны 2Б11:",
        allAnswer: ["238-480 Мгц",
            "238-340 Мгц 340-480 Мгц",
            "160-320 Мгц 390-645 Мгц",
            "248-380 Мгц",
            "330-400 Мгц"],
        answer: [3]
    });
    questions.push({
        question: "В состав преобразователя напряжения ПН 24/48 входят следующие устройства (укажите верные варианты ответа):",
        allAnswer: ["Корпус",
            "Импульсный преобразователь",
            "Кронштейн",
            "Фильтр питания ФП1",
            "Преобразователь напряжения DC-DС"],
        answer: [1,4,5]
    });
    questions.push({
        question: "О чем сигнализирует светодиодный индикатор (зеленый) «СЕТЬ» на передней панели корпуса ПН 24/48?",
        allAnswer: ["показывает подачу напряжения питания;",
            "показывает наличие выходного напряжения питания, необходимого для питания модуля доступа МД1-1Р;",
            "показывает, что пошла передача потока Е1 на выход антенны",
            "включен преобразователь напряжения",
            "идет прием основного цифрового потока"],
        answer: [1]
    });
    questions.push({
        question: "Какой вид модуляции используется при передаче потока Е1 в ЦРРС Р-429(укажите верный вариант ответа)?",
        allAnswer: ["PSK",
            "QPSK",
            "QAM-4",
            "ФИМ",
            "64-QAM"],
        answer: [2]
    });
    questions.push({
        question: "Какое программное обеспечение используется для работы с ЦРРС Р-429 (укажите верный вариант ответа)?",
        allAnswer: ["ПСО Мастер",
            "HyperTerminal",
            ".NetFraemwork 4.",
            "Link 3.4",
            "Favorit 1.0"],
        answer: [1]
    });
    questions.push({
        question: "Где осуществляется переключение режима передачи (количество каналов ТЧ) ?( укажите правильный вариант ответа)",
        allAnswer: ["На панели модуля доступа МД1-1Р",
            "В ПСО Мастер",
            "На блоке ПН 24/48",
            "С помощью канал Ethernet",
            "Через другого абонента"],
        answer: [2]
    });
    questions.push({
        question: "Какое напряжение питания идет в ПН 24/48 от источника постоянного тока (укажите верный вариант ответа)?",
        allAnswer: ["От +20 до +30 В",
            "От +19 до +25 В",
            "От -16 до +30 В",
            "От +21 до +29,7 В",
            "От +10 до +30 В"],
        answer: [4]
    });
    questions.push({
        question: "Реальная чувствительность приемника станции Р-429, соответствующая коэффициенту ошибок BER = 10-3/10-6 и пропускной способности ствола 1024 кбит/с, дБм:",
        allAnswer: ["-92,4/-91,4",
            "-91,4/-90,4",
            "-89,4/-88,4",
            "-87,1/-86,",
            "-84,4/-83,4"],
        answer: [3]
    });
    questions.push({
        question: "Назовите мощность, потребляемую от источника постоянного тока внутренним оборудованием станции Р-429 при конфигурации «1+0», Вт:",
        allAnswer: ["10",
            "20",
            "30",
            "40",
            "50"],
        answer: [4]
    });
    questions.push({
        question: "Назовите мощность, потребляемую приемо-передающим устройством станции Р-429, Вт:",
        allAnswer: ["15",
            "25",
            "35",
            "45",
            "55"],
        answer: [4]
    });
    questions.push({
        question: "Мощность, потребляемая от источника постоянного тока выносным оборудованием станции Р-429 при конфигурации «1+1», Вт:",
        allAnswer: ["20",
            "40",
            "60",
            "80",
            "100"],
        answer: [5]
    });
    questions.push({
        question: "Напряжение питания от источника постоянного тока в составе стационарных объектов станции Р-429, В:",
        allAnswer: ["-39 – -72",
            "-25 – -34",
            "+18,3 – +22",
            "+21 – +29,7",
            "+25,4 – +30"],
        answer: [1]
    });
    questions.push({
        question: "Максимальная длина кабеля снижения Р-429, м",
        allAnswer: ["100",
            "200",
            "300",
            "400",
            "500"],
        answer: [5]
    });
    questions.push({
        question: "Минимальная дальность связи станции Р-429 при условии прямой видимости, км:",
        allAnswer: ["25",
            "30",
            "50",
            "60",
            "70"],
        answer: [4]
    });
    questions.push({
        question: "Максимальная мощность сигнала на выходе передатчика станции Р-429, дБм:",
        allAnswer: ["33",
            "34-37",
            "37-39",
            "40",
            "41-43"],
        answer: [2]
    });
    questions.push({
        question: "Количество Z-излучателей антенны 2Б11 равно:",
        allAnswer: ["3",
            "4",
            "5",
            "6",
            "7"],
        answer: [3]
    });
}


window.onload = function () {
    testBlock = document.getElementById("workTest");
    testBlock.style.display = "none";
    mainBlock = document.getElementById("mainTestPage");
    mainBlock.style.display = "block";
    startTheoryBtn = document.getElementById("startTest");
    startTheoryBtn.addEventListener("click", startTest);
    resultTable = document.getElementById("tableResult");
    resultTable.style.display = "none";

    document.getElementById("show").addEventListener("click", ()=>{
        let resultList = JSON.parse(localStorage.getItem(idInLocalStorage));

        if (resultList !== undefined){
            if (resultList.length !== 0){
                showResultsForAllTimes(resultList);
            }
        }

    });
};

function showQuestion() {
    currentQuestion = activeQuestion[questionNumber];
    document.getElementById("questionString").innerText = currentQuestion.question;
    document.getElementById("questionHeader").innerText = "Вопрос " + (questionNumber+1);
    for(var i=1;i<6;i++){
        document.getElementById("radioLabel"+i).innerHTML = "<input type=\"radio\" class=\"radioButton\" id=\""+i+"\" value=\""+i+"\">"+currentQuestion.allAnswer[i-1];
    }
    questionNumber++;
}


function startTest() {
    userName = document.getElementById("user").value;
    group = document.getElementById("group").value;

    if ((userName === "") || (group === "")){
        alert("Заполните поля!");
        return;
    }


    initializeQuestions();
    mixArrayQuestions();
    takeArrayQuestions();
    showQuestion();

    document.getElementById("nextBtn").addEventListener("click", nextQuestion);

    mainBlock.style.display = "none";
    resultTable.style.display = "none";
    testBlock.style.display = "block";
}

function saveResult() {
    radioBtns = document.getElementsByClassName("radioButton");
    var results = [];
    for(var i =0;i<radioBtns.length; i++){
        if(radioBtns[i].checked){
            results.push(radioBtns[i].value);
        }
    }
    questionResult.push(results);
}

function showResultBlock() {
    mainBlock.style.display = "none";
    resultTable.style.display = "block";
    testBlock.style.display = "none";
    var result = 0;

    for(var i =1;i<11; i++){
        var row = document.getElementById("question"+i);
        var tdArray = row.querySelectorAll("td");
        tdArray[0].innerText = activeQuestion[i-1].question;
        tdArray[1].innerText = "";
        activeQuestion[i-1].answer.forEach(function (elem) {
            tdArray[1].innerText += activeQuestion[i-1].allAnswer[elem-1] + "\n ";
        });
        tdArray[2].innerText = "";
        questionResult[i-1].forEach(function (elem) {
            tdArray[2].innerText += activeQuestion[i-1].allAnswer[elem-1] + "\n ";
        });

        if (tdArray[1].innerText === tdArray[2].innerText){
            result++;
        }
    }

    document.getElementById("resultMark").innerHTML = "Ваша отметка: " + result;

    let now = new Date();

    let resultObj = new UserResult(userName, group, result, now.toLocaleString("ru"));
    let resultList = JSON.parse(localStorage.getItem(idInLocalStorage));

    if (resultList === null){
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
    list.forEach((elem)=>{
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

    arr.forEach((elem)=>{
        let tag = document.createElement(tagName);
        let p = document.createElement("p");
        p.innerHTML = elem;
        tag.appendChild(p);
        row.appendChild(tag);
    });

    return row;
}

function nextQuestion(ev) {
    if(questionNumber < 10) {
        saveResult();
        showQuestion();
        ev.preventDefault();
    } else {
        ev.preventDefault();
        saveResult();
        showResultBlock();
        console.log(questionResult);
    }
}

function UserResult(userName, group, mark, date) {
    this._userName = userName;
    this._group = group;
    this._mark = mark;
    this._date = date;
}