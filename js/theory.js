(function () {
    const TEXTBODYIDSELECTOR = "textBody";
    const TITLEIDSELECTOR = "title";

    let urlString = window.location.href;
    let param = urlString.slice(-1);

    let textArray = [

    ];


    function readTextFile(file)
    {
        let rawFile = new XMLHttpRequest();
        let result;
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status === 0)
                {
                    result = rawFile.responseText;
                }
            }
        };
        rawFile.send(null);
        return result;
    }

    textArray.push(readTextFile("./theoryHTML/characteristics"));

    let textTitleArray = [
        "Тактико-технические характеристики ЦРРС Р-429",
        "Состав станции",
        "Устройство станции",
        "Требования безопастности при подготовке станции к работе",
        "Варианты применения"
    ];

    let textBody;
    let textTitle;

    window.onload = init;

    function init() {
        urlString = window.location.href;
        param = urlString.slice(-1);
        textTitle = document.getElementById(TITLEIDSELECTOR);
        textBody = document.getElementById(TEXTBODYIDSELECTOR);
        textBody.innerHTML = textArray[param];
        textTitle.innerHTML = textTitleArray[param];
    }
})();
