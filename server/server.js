const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');
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

  socket.on('createMessage', (message) => {
    var time = new Date();
    console.log('createdMessage', message);
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
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
