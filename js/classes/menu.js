export default class Menu {
    #menu;

    constructor(container) {
        this.#menu = container.querySelector("#user-menu");
    }

    toggle() {
        this.#menu.classList.toggle("hidden");
    }

    visible() {
        return !this.#menu.classList.contains("hidden");
    }
}