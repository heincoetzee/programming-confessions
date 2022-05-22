import Menu from "./classes/menu.js";

const container = document.querySelector("#user");
const toggleIcon = document.querySelector("#user-toggle img");
const menu = new Menu(container);

toggleIcon.addEventListener("click", event => {
    event.stopPropagation();
    menu.toggle();
});

window.addEventListener("click", () => {
    if (menu.visible()) {
        menu.toggle();
    }
});
