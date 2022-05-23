export default class SearchBar {
    #searchInput;
    #confessions;

    constructor(searchBar) {
        this.#searchInput = searchBar.querySelector("#search-input");
    }

    #isEmpty(string) {
        return string === "";
    }
    get confessions() {
        return this.#confessions;
    }
    set confessions(confessions) {
        this.#confessions = Array.from(confessions);
    }

    get searchQuery() {
        return this.#searchInput.value.trim().toLowerCase();
    }
    get titles() {
        // get all of the titles
        return this.confessions.map(confession => confession.children[0]);
    }

    get matches() {
        let searchQuery = this.searchQuery;

        // get all of the titles that contains the searchQuery
        const matches = this.titles.filter(title => {
            const text = title.textContent.toLowerCase();
            return text.includes(searchQuery);
        });

        // then get those titles parent's (the sections) which need to be shown
        return matches.map(match => match.parentNode);
    }

    search() {
        if (!this.#isEmpty(this.searchQuery)) {
            let matches = this.matches;
            this.confessions.forEach(confession => {
                if (matches.includes(confession)) {
                    confession.classList.remove("hidden");
                } else {
                    confession.classList.add("hidden");
                }
            });
        } else {
            this.confessions.forEach(confession => {
                confession.classList.remove("hidden");
            })
        }
    }


}
