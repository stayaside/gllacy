var link = document.querySelector(".callback-button");
var popup = document.querySelector(".callback-popup");
var close = popup.querySelector(".callback-popup-close");
var user = popup.querySelector("[name=name]");
var form = popup.querySelector("form");
var mail = popup.querySelector("[name=email]");
var text = popup.querySelector("[name=textarea]");


//LOGIN

link.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.add("modal-content-show");
    user.focus();
});

close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("modal-content-show");
    popup.classList.remove("modal-error");
}); 

form.addEventListener("submit", function(event) {
    if (!user.value || !mail.value || !text.value) {
        event.preventDefault();
        popup.classList.add("modal-error");
    } else {
        localStorage.setItem("user", user.value);
    }
});  

window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
        if (popup.classList.contains("modal-content-show")) {
            popup.classList.remove("modal-content-show");
        }
    }
});