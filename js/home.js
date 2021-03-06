"use strict";

import ConfessionGalley from "./classes/confession-gallery.js";

const main = document.querySelector("main");
const template = document.querySelector("template");

const confessionGallery = new ConfessionGalley(main, template);

window.addEventListener("load", () => {
    confessionGallery.displayAll("../php/get-confessions.php", false);
});
