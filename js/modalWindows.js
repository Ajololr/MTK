window.onload = init;

function init() {
    let imgs = document.getElementsByClassName("img-responsive");

    for (let elem of imgs) {
        elem.addEventListener("click", ()=>{
            let src = elem.getAttribute("src");
            let alt = elem.getAttribute("alt");

            let img = document.createElement("img");
            img.className = "img-responsive";
            img.src = src;

            let title = document.getElementsByClassName("modal-header")[0];
            let body = document.getElementsByClassName("modal-body")[0];

            title.innerHTML = alt;
            while (body.firstChild)
                body.removeChild(body.firstChild);
            body.appendChild(img);
        });
    }
}
