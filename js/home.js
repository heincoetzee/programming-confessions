"use strict";

import ConfessionGalley from "./classes/confession-gallery.js";

const container = document.querySelector("main");
const template = document.querySelector("template");

const confessionGallery = new ConfessionGalley(container, template);

window.addEventListener("load", () => {
    confessionGallery.displayAll("../php/get-confessions.php");
});