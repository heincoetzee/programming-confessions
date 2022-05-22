import LoginForm from "./classes/login-form.js";

const form = document.querySelector("form");
const loginForm = new LoginForm(form);

form.addEventListener("submit", event => {
    event.preventDefault();

    const location = form.getAttribute("action");
    loginForm.submit(location);
});