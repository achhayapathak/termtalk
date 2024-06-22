#!/usr/bin/env node

const io = require('socket.io')(12345);

io.on('connect', socket => {
    console.log('A user connected');
  
    socket.on('message', data => {
      io.emit('message', data); // Broadcast the received message to all connected clients
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });