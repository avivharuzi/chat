require('dotenv').config();

const app = require('./app');
const http = require('http');

const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

const io = require('socket.io')(server);

let users = [];

io.sockets.on('connection', (socket) => {
    socket.on('new user', function (data) {
        socket.user = data;
        users.push(socket.user);
        updateUsers();
    });

    socket.on('send message', (data) => {
        io.sockets.emit('new message', {
            user: data.user,
            message: data.message,
            time: data.time,
            color: data.color
        });
    });

    socket.on('disconnect', () => {
        if (!socket.user) return;
        users.splice(users.indexOf(socket.user), 1);
        updateUsers();
    });

    socket.on('disconnect manual', (data) => {
        users.splice(users.indexOf(data.user), 1);
        updateUsers();
    });
});

function updateUsers() {
    io.sockets.emit('users', users);
}

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
