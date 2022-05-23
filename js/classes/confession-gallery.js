"use strict";

export default class ConfessionGalley {
    #container;
    #template;

    constructor(container, template) {
        this.#container = container;
        this.#template = template;
    }

    #display(element) {
        this.#container.appendChild(element);
    }

    #create(confession) {
        const card = this.#template.content.cloneNode(true);
        const basicInfo = card.children[0].children;
        const likeCounter = card.querySelector(".like-counter p");
        const likeIcon = card.querySelector(".like-counter img");

        basicInfo[0].textContent = confession.title;
        basicInfo[1].textContent = `${confession.username} | ${confession.date_created}`;
        basicInfo[2].textContent = confession.body;
        likeCounter.textContent = confession.numLikes;

        if (confession.isLikedByUser) {
            likeIcon.classList.add("filter-blue");
        }

        this.#display(card);
    }

    async #sendRequest(url) {
        const response = await fetch(url);

        return response.json();
    }

    displayAll(url) {
        this.#sendRequest(url).then(confessions => {
            confessions.forEach(confession => {
                this.#create(confession);
            });
        });
    }

}