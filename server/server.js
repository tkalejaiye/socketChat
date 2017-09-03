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

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	})
});


server.listen(port, () => {
	console.log(`Server running on port ${port}`);
})