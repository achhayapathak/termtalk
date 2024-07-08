#!/usr/bin/env node

const io = require('socket.io');

const getPortNumber = require('./getPort');
const createTunnel = require('./createTunnel');
// check if port is valid
getPortNumber(async (PORT) => {
    if(PORT) {
        // create socket.io server with user given PORT
        const server = io(PORT);
        console.log(`Waiting for server links to generate ...`);

        server.on('connect', socket => {
            console.log('A user connected');

            socket.on('message', data => {
                server.emit('message', data); // Broadcast the received message to all connected clients
            });

            socket.on('setUsername', username => {
              socket.username = username; // Set the username for the socket
              server.emit('welcome', { username, message: `${username} has joined the chat!`}); 

            });

            socket.on('disconnect', () => {
              console.log('A user disconnected');
              server.emit('bye-bye', { message: `${socket.username} has left the chat.` });
          });

        });

        // create a public URL
        createTunnel(PORT);
    } else {
        console.log('Failed to start server');
        return;
    }
});


