const signOutButton = document.querySelector("#sign-out");

signOutButton.addEventListener("click", () => {
    fetch("../php/sign-out-user.php", {
        method: "POST"
    }).then(() => window.location.href = "../");
});