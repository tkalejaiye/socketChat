const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const PUBLIC_PATH = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(PUBLIC_PATH));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', {
		from: 'tolu@test.com',
		text: 'sup lil mama',
		createdAt: 123
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});

});


server.listen(port, () => {
	console.log(`Server running on port ${port}`);
})