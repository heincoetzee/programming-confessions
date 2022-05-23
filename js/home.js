"use strict";

import ConfessionGalley from "./classes/confession-gallery.js";
import LikeCounter from "./classes/like-counter.js";

const main = document.querySelector("main");
const template = document.querySelector("template");

const confessionGallery = new ConfessionGalley(main, template);
const likeCounter = new LikeCounter("../php/update-like.php");

window.addEventListener("load", () => {
    confessionGallery.displayAll("../php/get-confessions.php");
});

main.addEventListener("click", event => {
    const target = event.target;
    const targetParent = target.parentNode;

    if (targetParent.classList.contains("like-counter") && (target.nodeName === "IMG")) {
        likeCounter.container = targetParent;
    }
});