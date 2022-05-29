import SearchBar from "./classes/searchbar.js";

const searchContainer = document.querySelector("#searchbar-wrapper");
const searchInput = document.querySelector("#search-input");
const searchBar = new SearchBar(searchContainer);

searchInput.addEventListener("input", () => {
    searchBar.confessions = document.querySelectorAll(".confession-card");
    searchBar.search();
});