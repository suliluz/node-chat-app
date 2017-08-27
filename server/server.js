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
