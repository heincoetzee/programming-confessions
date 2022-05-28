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

    #create(confession, removeButtons) {
        const card = this.#template.content.cloneNode(true);
        const section = card.children[0];
        const basicInfo = section.children;
        const likeContainer = card.querySelector(".like-counter");
        const likeCounter = card.querySelector(".like-counter p");
        const likeIcon = card.querySelector(".like-counter img");

        likeContainer.setAttribute("id", confession.confession_id);
        basicInfo[0].textContent = confession.title;
        basicInfo[1].textContent = `${confession.username} | ${confession.date_created}`;
        basicInfo[2].textContent = confession.body;
        likeCounter.textContent = confession.numLikes;

        if (confession.isLikedByUser) {
            likeIcon.classList.add("filter-blue");
        }

        if (removeButtons) {
            const buttons = section.querySelector(".update");
            buttons.remove();
        }

        this.#display(card);
    }

    removeAll() {
        const cards = Array.from(this.#container.children);

        cards.forEach(card => card.remove());
    }

    async #sendRequest(url) {
        const response = await fetch(url);

        return response.json();
    }

    displayAll(url, removeButtons) {
        this.#sendRequest(url).then(confessions => {
            confessions.forEach(confession => {
                this.#create(confession, removeButtons);
            });
        });
    }

}