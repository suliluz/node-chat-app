const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('admin', 'Welcome to the chat!');

  socket.broadcast.emit('admin', 'A new user has joined');

  socket.on('createMessage', (message, callback) => {
    var time = new Date();
    console.log('createdMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback("Message is received");
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User is disconnected from the server');
  });
});

app.get('/', (req, res) => {
  res.render('index.html')
});

server.listen(port, () => {
  console.log(`App is online on port ${port}`);
});
