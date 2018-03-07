require('dotenv').config();

const app = require('./app');
const http = require('http');
const moment = require('moment');

const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

const io = require('socket.io')(server);

io.sockets.on('connection', (socket) => {
    socket.on('send message', (data) => {
        io.sockets.emit('new message', {
            user: data.user,
            message: data.message,
            time: moment().format('MMMM Do YYYY, h:mm:ss a'),
            color: data.color
        });
    });
});

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
