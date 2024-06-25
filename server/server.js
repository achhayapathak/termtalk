#!/usr/bin/env node

const io = require('socket.io')(12345);

io.on('connect', socket => {
    console.log('A user connected');
  
    socket.on('message', data => {
      io.emit('message', data); // Broadcast the received message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
      io.emit('bye-bye', { message: `${socket.username} has left the chat.` });
    });

    socket.on('setUsername', username => {
      socket.username = username; // Set the username for the socket
      io.emit('message', { name: 'Server', message: `${username} has joined the server.` }); // Broadcast join message
    });
  });