"use strict";

function messageTemplate(user) {
    let color = `style='color:#fff;background-color:${user.color}'`;

    CALL_MESSAGES.append(`
        <div class="main-message">
            <p><span class="badge-user" ${color}>${user.user}</span><span class="date">${user.time}</span><span>${user.message}</span></p>
        </div>
    `);
}
