export default class LikeCounter {
    #url;
    #container;
    #icon;
    #counter;

    constructor(url) {
        this.#url = url;
    }

    set container(container) {
        this.#container = container;
        this.#icon = container.querySelector("img");
        this.#counter = container.querySelector("p");
        this.#icon.addEventListener("click", this.#like());

    }

    get counter() {
        return Number(this.#counter.textContent);
    }

    #isLiked() {
        return this.#icon.classList.contains("filter-blue");
    }

    #increment() {
        // Change the colour of the icon to blue
        this.#icon.classList.add("filter-blue");

        // Increment the counter
        this.#counter.textContent = (this.counter + 1);
    }

    #decrement() {
        // Remove the blue colour from the icon
        this.#icon.classList.remove("filter-blue");

        // Decrement the counter;
        this.#counter.textContent = (this.counter - 1);
    }

    #like() {
        if (this.#isLiked()) {
            this.#decrement();
        } else {
            this.#increment();
        }

        this.#updateLike();
    }

    #getQueryString() {
        return `liked=${Number(this.#isLiked())}&confession_id=${this.#container.id}`;
    }

    async #sendRequest() {
        const response = await fetch(this.#url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: this.#getQueryString() 
        });

        return response.text();
    }

    #updateLike() {
        this.#sendRequest().then(message => {
            if (message !== "") {
                console.log(message);
            }
        }).catch(error => {
            console.log(error);
        });
    }

}