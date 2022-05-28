const title = document.querySelector("form input");
const body = document.querySelector("textarea");

window.addEventListener("load", () => {
    fetch("../php/get-confession.php").then(response => {
        return response.json();
    }).then(confession => {
        title.value = confession.title;
        body.value = confession.body;
    });
});