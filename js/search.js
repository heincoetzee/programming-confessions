import SearchBar from "./classes/searchbar.js";

const searchContainer = document.querySelector("#searchbar-wrapper");
const searchInput = document.querySelector("#search-input");
const searchBar = new SearchBar(searchContainer);

let initial = true;
searchInput.addEventListener("input", () => {
    if (initial) {
        searchBar.confessions = document.querySelectorAll(".confession-card");
        initial = false;
    }
    searchBar.search();
});