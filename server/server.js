const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');
const PUBLIC_PATH = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(PUBLIC_PATH));

io.on('connection', (socket) => {
	console.log('New user connected');

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined!'));

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text))
		callback('This is from the server');
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});

});


server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});