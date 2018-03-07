"use strict";

let socket = io.connect();
let currentUser = null;

socket.on("new message", function (data) {
    messageTemplate(data);
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
    }
});

EXIT.on("click", function () {
    socket.emit('disconnect manual', currentUser);
    currentUser = null;
    goToJoin();
});

function goToJoin() {
    MAIN_CHAT.hide();
    MAIN_ENTERANCE.show();
}

function goToChat() {
    MAIN_CHAT.show();
    MAIN_ENTERANCE.hide();
}

function getRandomColor() {
    let colors = [
        "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4",
        "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107",
        "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"
    ];

    return colors[Math.floor(Math.random() * colors.length)];
}
