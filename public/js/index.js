var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.on('admin', function (admin) {
    console.log('Message from Admin: ', admin);
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (newMessage) {
  console.log('Got New Message', newMessage);
});
