export default class LoginForm {
    #form;
    #inputElements;
    #username;
    #password;

    constructor(form) {
        this.#form = form;

        this.#inputElements = Array.from(form.elements).slice(0, 2);
        [this.#username, this.#password] = this.#inputElements;
    }

    get form() {
        return this.#form;
    }
    get username() {
        return this.#username.value.trim();
    }
    get password() {
        return this.#password.value.trim();
    }
    get inputElements() {
        return this.#inputElements;
    }
    #insertAfter(newElement, existingElement) {
        existingElement.parentNode.insertBefore(newElement, existingElement.nextSibling);
    }
    #createErrorMessage(string) {
        const error = document.createElement("p");
        error.textContent = string;

        return error;
    }
    #displayErrorMessage(string, existingElement) {
        const error = this.#createErrorMessage(string);

        this.#insertAfter(error, existingElement);
    }
    #isEmpty(string) {
        return string === "";
    }
    #validUsername() {
        const username = this.username;
        const length = username.length;
        
        const isEmpty = this.#isEmpty(username);
        const validLength = (length >= 5) && (length <= 10);

        return !isEmpty && validLength;
    }
    #validPassword() {
        const password = this.password;
        const length = password.length;

        const isEmpty = this.#isEmpty(password);
        const validLength = (length >= 8) && (length <= 16);

        return !isEmpty && validLength;
    }

    #validFields() {
        return this.#validUsername() && this.#validPassword();
    }

    #validateFields() {
        const errorMessage = type => `${type} not valid. Please try again`;
        if (!this.#validUsername()) {
            this.#displayErrorMessage(errorMessage("Username"), this.#username);
        }

        if (!this.#validPassword()) {
            this.#displayErrorMessage(errorMessage("Password"), this.#password);
        }
    }
    #removeErrorMessages() {
        const errorMessages = this.form.querySelectorAll("p");

        if (errorMessages !== null) {
            Array.from(errorMessages).forEach(error => error.remove());
        }
    }
    #reset() {
        this.#removeErrorMessages();

        this.inputElements.forEach(element => {
            element.value = "";
        });
    }
    #getQueryString() {
        const inputElements = this.inputElements;

        let queryString = "";
        for (let element of inputElements) {
            queryString += `${element.name}=${element.value}&`;
        }
        return queryString.slice(0, queryString.length - 1);
    }
    async #sendRequest(url) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body : this.#getQueryString()
        });

        return response.text();
    }

    #processRequest(url) {
        this.#sendRequest(url).then(message => {
            if (message === "success") {
                this.#reset();
                window.location.href = "./home";
            } else {
                const errorMessage = "Invalid Credentials. Please try again";
                this.#displayErrorMessage(errorMessage, this.#username);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    submit(url) {
        if (!this.#validFields()) {
            this.#removeErrorMessages();
            this.#validateFields();
        } else {
            this.#removeErrorMessages();
            this.#processRequest(url);
        }
    }


}