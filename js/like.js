import LikeCounter from "./classes/like-counter.js";
const likeCounter = new LikeCounter("../php/update-like.php");

let main = document.querySelector("#confessions-created");

if (main === null) {
    main = document.querySelector("main");
}

main.addEventListener("click", event => {
    const target = event.target;
    const targetParent = target.parentNode;

    if (targetParent.classList.contains("like-counter") && (target.nodeName === "IMG")) {
        likeCounter.container = targetParent;
    }
});