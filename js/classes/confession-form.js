export default class ConfessionForm {
    #form;
    #inputElements;
    #title;
    #body;

    constructor(form) {
        this.#form = form;

        this.#inputElements = Array.from(this.#form.elements).slice(0, 2);
        [this.#title, this.#body] = this.#inputElements;
    }

    get form() {
        return this.#form;
    }
    get title() {
        return this.#title.value.trim();
    }
    get body() {
        return this.#body.value.trim();
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

    #validTitle(mode) {
        const title = this.title;
        const length = title.length;

        const isEmpty = this.#isEmpty(mode);
        const validLength = (length >= 5) && (length <= 20);

        if (mode === 0) {
            return !isEmpty && validLength;
        } else if (mode === 1) {
            return [!isEmpty, validLength];
        }
    }
    #validBody(mode) {
        const body = this.body;
        const length = body.length;

        const isEmpty = this.#isEmpty(body);
        const validLength = (length >= 20) && (length <= 140);

        if (mode === 0) {
            return !isEmpty && validLength;
        } else if (mode === 1) {
            return [!isEmpty, validLength];
        }
    }

    #validFields() {
        return this.#validTitle(0) && this.#validBody(0);
    }

    #validateFields() {
        const emptyErrorMessage = field => `Please provide a ${field}`;

        const [titleNotEmpty, titleValidLength] = this.#validTitle(1);
        const titleLengthErrorMessage = "Please provide at least 5 and at most \
            20 characters";

        if (!titleNotEmpty) {
            this.#displayErrorMessage(emptyErrorMessage("Title"), this.#title);
        } else if (!titleValidLength) {
            this.#displayErrorMessage(titleLengthErrorMessage, this.#title);
        }

        const [bodyNotEmpty, bodyValidLength] = this.#validBody(1);
        const bodyLengthErrorMessage = "Please provide at least 20 and at most \
            140 characters";

        if (!bodyNotEmpty) {
            this.#displayErrorMessage(emptyErrorMessage("Body"), this.#body);
        } else if (!bodyValidLength) {
            this.#displayErrorMessage(bodyLengthErrorMessage, this.#body);
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

        // Move user to the Home page
        window.location.href = "../home";
    }
    async #getUserName() {
        const response = await fetch("../php/get-username.php");
        return response.text();
    }
    #getQueryString() {
        const inputElements = this.inputElements;

        let queryString = "";
        for (let element of inputElements) {
            queryString += `${element.name}=${encodeURIComponent(element.value)}&`;
        }
        return queryString.slice(0, queryString.length - 1);
    }
    async #sendRequest(url, queryString) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body : queryString
        });

        return response.text();
    }

    #processRequest(url, queryString) {
        this.#sendRequest(url, queryString).then(message => {
            if (!this.#isEmpty(message)) {
                console.log(message);
            }
            this.#reset();
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
            this.#getUserName().then(username => {
                let queryString = `${this.#getQueryString()}&username=${encodeURIComponent(username)}`;

                this.#processRequest(url, queryString);
            })
        }
    }

}