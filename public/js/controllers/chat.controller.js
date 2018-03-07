"use strict";

let socket = io.connect();
let currentUser = null;

socket.on("new message", function (data) {
    messageTemplate(data);
    CALL_MESSAGES.scrollTop(CALL_MESSAGES[0].scrollHeight);
});

socket.on('users', (data) => {
    usersTemplate(data);
});

SEND.on("click", function () {
    let message = MESSAGE.val();
    if (message !== '') {
        let chat = new Chat(currentUser.user, message, currentUser.color);
        socket.emit("send message", chat);
        MESSAGE.val("");
    }
});

JOIN.on("click", function () {
    let user = USER.val();
    if (user !== '') {
        currentUser = new User(user);
        USER.val("");
        socket.emit("new user", user);
        goToChat();
        MESSAGE.focus();
    }
});

EXIT.on("click", function () {
    socket.emit('disconnect manual', currentUser);
    currentUser = null;
    goToJoin();
    USER.focus();
});

MESSAGE.on("keypress", function (event) {
    if (event.keyCode == 13) {
        SEND.click();
    }
});

USER.on("keypress", function (event) {
    if (event.keyCode == 13) {
        JOIN.click();
    }
});

$("body").on("keyup", function (event) {
    if (event.keyCode == 27 && currentUser !== null) {
        EXIT.click();
    }
});

function goToJoin() {
    MAIN_CHAT.hide();
    MAIN_ENTERANCE.show();
    resetChat();
}

function goToChat() {
    MAIN_CHAT.show();
    MAIN_ENTERANCE.hide();
    resetChat();
}

function resetChat() {
    CALL_MESSAGES.html("");
}

function getRandomColor() {
    let colors = [
        "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4",
        "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107",
        "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}
