"use strict";
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading....";
    messageTwo.textContent = "";
    fetch("/weather?address=" + location + "")
        .then((response) => response.json())
        .then((data) => {
        if (data.e) {
            messageOne.textContent = data.e;
        }
        else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});
//# sourceMappingURL=app.js.map