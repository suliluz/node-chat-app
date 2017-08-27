const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey. What is going on.',
  //   createAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.emit('newMessage', {
    from: 'hellodarkness440@gmail.com',
    text: 'How is it going my peeps?'
  });

  socket.on('createMessage', (createMessage) => {
    var time = new Date();
    console.log('createdMessage', createMessage, 'createdAt:', time);
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
