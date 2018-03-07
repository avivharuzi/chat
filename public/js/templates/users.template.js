"use strict";

function usersTemplate(users) {
    USERS_NUMBER.html(users.length);

    let output =  '';

    for (let user of users) {
        output += `<span>${user}</span>`;
    }

    LIST_USERS_ONLINE.html(output);
}
