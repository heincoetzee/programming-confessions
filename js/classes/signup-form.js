export default class SignUpForm {
    #form;
    #inputElements;
    #username;
    #password;
    #passwordRepeat;
    #upperCaseLetters;
    #lowerCaseLetters;
    #digits;
    #specialCharacters;

    constructor(form) {
        this.#form = form;
        this.#inputElements = Array.from(this.form).slice(0, 3);

        [this.#username, this.#password, this.#passwordRepeat] = this.#inputElements; 

        // get an array of uppercase letters
        this.#upperCaseLetters = [];
        for (let number = 65; number <= 90; number++) {
            this.#upperCaseLetters.push(String.fromCharCode(number));
        }

        // get an array of lowercase letters
        this.#lowerCaseLetters = [];
        for (let number = 97; number <= 122; number++) {
            this.#lowerCaseLetters.push(String.fromCharCode(number));
        }

        // get an array of digits
        this.#digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

        // get an array of special characters
        this.#specialCharacters = [
            "~", "`", "!", "@", "#", "$", "%", "^", "&", "*", 
            "(", ")", "-", "_", "+", "=", "{", "}", "[", "]",
            "\\", "|", ":", ";", "\"", "'", "<", ",", ">", 
            ".", "?", "/", 
        ];

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
    get passwordRepeat() {
        return this.#passwordRepeat.value.trim();
    }
    get inputElements() {
        return this.#inputElements;
    }
    get upperCaseLetters() {
        return this.#upperCaseLetters;
    }
    get lowerCaseLetters() {
        return this.#lowerCaseLetters;
    }
    get digits() {
        return this.#digits;
    }
    get specialCharacters() {
        return this.#specialCharacters;
    }
    #count(string, array) {
        let counter = 0;

        for (let char of string) {
            if (array.includes(char)) counter++;
        }
        return counter;
    }
    #isEmpty(string) {
        return string === "";
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

    #validUsername(mode) {
        const username = this.username;
        const length = username.length;

        // username is valid if it's not empty and between 5 and 10 characters
        const isEmpty = this.#isEmpty(username);
        const validLength = (length >= 5) && (length <= 10);

        if (mode === 0) {
            return !isEmpty && validLength;
        } else if (mode === 1) {
            return [!isEmpty, validLength];
        }
    }
    #validPassword(mode) {
        const password = this.password;
        const length = password.length;
        const isEmpty = this.#isEmpty(password);
        const validLength = (length >= 8) && (length <= 16);

        const numUpperCaseLetters = this.#count(password, this.upperCaseLetters);
        const numLowerCaseLetters = this.#count(password, this.lowerCaseLetters);
        const numDigits = this.#count(password, this.digits);
        const numSpecialChars = this.#count(password, this.specialCharacters);

        const validUpperCaseLetters = numUpperCaseLetters >= 1;
        const validLowerCaseLetters = numLowerCaseLetters >= 3;
        const validDigits = numDigits >= 1; 
        const validSpecialChars = numSpecialChars >= 1;

        if (mode === 0) {
            return (!isEmpty && validLength && validUpperCaseLetters && 
                    validLowerCaseLetters && validDigits && validSpecialChars);
        } else if (mode === 1) {
            return [!isEmpty, validLength, validUpperCaseLetters, 
                validLowerCaseLetters, validDigits, validSpecialChars];
        }

    }
    #validPasswordRepeat(mode) {
        const passwordRepeat = this.passwordRepeat;

        // password repeat valid if not empty and matches the password
        const isEmpty = this.#isEmpty(passwordRepeat);
        const passwordsMatch = passwordRepeat === this.password; 

        if (mode === 0) {
            return !isEmpty && passwordsMatch;
        } else if (mode === 1) {
            return [!isEmpty, passwordsMatch];
        }
    }

    #validFields() {
        return (this.#validUsername(0) && this.#validPassword(0) && 
            this.#validPasswordRepeat(0));
    }
    #validateFields() {
        const emptyErrorMessage = field => `Please provide a ${field}`;

        const [usernameNotEmpty, usernameLengthValid] = this.#validUsername(1);
        const userLengthErrorMessage = `Please provide at least 5 and at most
            10 characters`;
        const username = this.#username;

        // Validate the username
        if (!usernameNotEmpty) {
            this.#displayErrorMessage(emptyErrorMessage("username"), username);
        } else if (!usernameLengthValid) {
            this.#displayErrorMessage(userLengthErrorMessage, username);
        }

        const [passwordNotEmpty, passwordLengthValid, validUpperCaseLetters,
        validLowerCaseLetters, validDigits, validSpecialChars] = this.#validPassword(1);

        const passwordLengthErrorMessage = `Please provide at least 8 and at most
            16 characters`;
        const upperCaseLettersErrorMessage = `Please provide at least 1 uppercase letters`;
        const lowerCaseLettersErrorMessage = `Please provide at lease 3 lowercase letters`;
        const digitsErrorMessage = `Please provide at least 1 digit`;
        const specialCharsErrorMessage = `Please provide at least 1 special character`;

        const password = this.#password;

        // Validate the password
        if (!passwordNotEmpty) {
            this.#displayErrorMessage(emptyErrorMessage("password"), password);
        } else if (!passwordLengthValid) {
            this.#displayErrorMessage(passwordLengthErrorMessage, password);
        } else if (!validUpperCaseLetters) {
            this.#displayErrorMessage(upperCaseLettersErrorMessage, password);
        } else if (!validLowerCaseLetters) {
            this.#displayErrorMessage(lowerCaseLettersErrorMessage, password);
        } else if (!validDigits) {
            this.#displayErrorMessage(digitsErrorMessage, password);
        } else if (!validSpecialChars) {
            this.#displayErrorMessage(specialCharsErrorMessage, password);
        }

        const [passwordRepeatNotEmpty, passwordRepeatMatches] = this.#validPasswordRepeat(1);
        const noMatchErrorMessage = 'Passwords do not match. Please try again';

        const passwordRepeat = this.#passwordRepeat;

        // Validate the password repeat
        if (!passwordRepeatNotEmpty) {
            this.#displayErrorMessage(emptyErrorMessage("password repeat"), passwordRepeat);
        } else if (!passwordRepeatMatches) {
            this.#displayErrorMessage(noMatchErrorMessage, passwordRepeat);
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

        // Move user to the login page
        window.location.href = "../";
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
        this.#sendRequest(url).then((message) => {
            if (message.includes("Duplicate entry")) {
                this.#removeErrorMessages();
                const usernameTakeMessage = "Username already taken. Please provide another";
                this.#displayErrorMessage(usernameTakeMessage, this.#username);
                this.#username.focus();
            } else {
                this.#reset();
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
            this.#processRequest(url);
        }
    }

}