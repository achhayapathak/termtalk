#!/usr/bin/env node

const io = require('socket.io');

const getPortNumber = require('./getPort');

// check if port is valid
getPortNumber((PORT) => {
    if(PORT) {
        // create socket.io server with user given PORT
        const server = io(PORT);
        console.log(`Server started on PORT ${PORT}\nWaiting for users to connect`);

        server.on('connect', socket => {
            console.log('A user connected');

            socket.on('message', data => {
                server.emit('message', data); // Broadcast the received message to all connected clients
            });

            socket.on('disconnect', () => {
                console.log('A user disconnected');
                server.emit('bye-bye', { message: `${socket.username} has left the chat.` });
            });

            socket.on('setUsername', username => {
                socket.username = username; // Set the username for the socket
            });
        });
    } else {
        console.log('Failed to start server');
        return;
    }
});


