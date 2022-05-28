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
    const targetText = target.textContent;

    let confession_id;
    if (targetText === "Edit") {
        confession_id = target.parentNode.parentNode.previousElementSibling.id;
    } else if (targetText === "Delete") {
        confession_id = target.parentNode.previousElementSibling.id;
    }

    if ((targetText === "Edit") || (targetText === "Delete")) {
        fetch("../php/store-confession-id.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `confession_id=${encodeURIComponent(confession_id)}`
        }).then(() => {
            if (targetText === "Edit") {
                window.location.href ="../edit";
            }
        });
    }

    if (targetText === "Delete") {
        const confessionCard = target.parentNode.parentNode.parentNode;
        confessionCard.remove();

        fetch("../php/delete-confession.php", {
            method: "POST",
        }).then(response => {
            return response.text();
        }) .then(message => {
            if (message !== "") {
                console.log(message);
            }
        });
    }


});