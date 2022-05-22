import SignUpForm from "./classes/signup-form.js";

const form = document.querySelector("form");
const signUpForm = new SignUpForm(form);

form.addEventListener("submit", event => {
    const location = form.getAttribute("action");
    event.preventDefault();

    signUpForm.submit(`../php/${location}`);
});