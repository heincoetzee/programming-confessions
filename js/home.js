"use strict";

import ConfessionGalley from "./classes/confession-gallery.js";
import LikeCounter from "./classes/like-counter.js";
import SearchBar from "./classes/searchbar.js";

const main = document.querySelector("main");
const template = document.querySelector("template");
const searchContainer = document.querySelector("#searchbar-wrapper");
const searchInput = document.querySelector("#search-input");

const confessionGallery = new ConfessionGalley(main, template);
const likeCounter = new LikeCounter("../php/update-like.php");
const searchBar = new SearchBar(searchContainer);

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

let initial = true;
searchInput.addEventListener("input", () => {
    if (initial) {
        searchBar.confessions = document.querySelectorAll(".confession-card");
        initial = false;
    }
    searchBar.search();
});