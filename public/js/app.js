"use strict";

$(function () {
    checkUser();

    $("#join").on("click", function () {
        let user = $("#user").val();

        if (user !== '') {
            localStorage.setItem('user', user);
            $("#user").val("");
            goToChat();
        }
    });

    $("#exit").on("click", function () {
        localStorage.removeItem('user');
        goToJoin();
    });

    function checkUser() {
        if (localStorage.getItem('user')) {
            goToChat();
            return true;
        } else {
            goToJoin();
            return false;
        }
    }

    function goToJoin() {
        $("#mainChat").hide();
        $("#mainEnterance").show();
    }

    function goToChat() {
        $("#mainChat").show();
        $("#mainEnterance").hide();
    }

    function messageTemplate(data, random = false) {
        let randomColor = '';

        if (random) {
            randomColor = `style='color:#fff;background-color:${getRandomColor()}'`;
        }

        $("#callMessages").append(`
        <div class="main-message">
            <p><span class="badge-user" ${randomColor}>${data.user}</span><span class="date">${data.time}</span><span>${data.message}</span></p>
        </div>
        `);
    }

    function getRandomColor() {
        let colors = [
            "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4",
            "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107",
            "#FF9800", "#FF5722", "#795548", "#9E9E9E", "#607D8B"
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    }

    let socket = io.connect();

    $("#send").on("click", function () {
        let msg = $("#message").val();
        socket.emit('send message', { message: msg, user: 'johny' });
        $("#message").val("");
    });

    socket.on('new message', function (data) {
        console.log(data);
        messageTemplate(data, true);
    });
});
