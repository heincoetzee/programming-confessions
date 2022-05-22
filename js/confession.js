import ConfessionForm from "./classes/confession-form.js";

const form = document.querySelector("form");
const confessionForm = new ConfessionForm(form);

form.addEventListener("submit", event => {
    event.preventDefault();

    const location = form.getAttribute("action");
    confessionForm.submit(location);
});