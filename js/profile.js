"use strict";

import ConfessionGalley from "./classes/confession-gallery.js";

const main = document.querySelector("#confessions-created");
const template = document.querySelector("template");

const confessionGallery = new ConfessionGalley(main, template);

window.addEventListener("load", () => {
    confessionGallery.displayAll("../php/get-user-confessions.php");
});

main.addEventListener("click", event => {
    event.preventDefault();
    const target = event.target;

    if (target.textContent === "Edit") {
        const confession_id = target.parentNode.parentNode.previousElementSibling.id;

        fetch("../php/store-confession-id.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `confession_id=${encodeURIComponent(confession_id)}`
        }).then(() => window.location.href ="../edit");

    }


});