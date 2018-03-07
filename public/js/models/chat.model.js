"use strict";

function Chat(_user, _message, _color) {
    this.user = _user;
    this.message = _message;
    this.color = _color;
    this.time = moment().format('MMMM Do YYYY, h:mm:ss a');
}
