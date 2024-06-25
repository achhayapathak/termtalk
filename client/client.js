#!/usr/bin/env node

const ioClient = require('socket.io-client');
const readline = require('readline');

const startChat = require('./chat');
const promptServerDetails = require('./promptUrl')

const connectToServer = () => {
    promptServerDetails((url) => {
        if (url) {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            console.log(`Trying to connect to server at ${url} ...`);

            const socket = ioClient.connect(`${url}`);

            // Handle successful connections
            socket.on('connect', () => {
                console.log(`Connected to server at ${url}`);
                rl.question('Enter your name: ', name => {
                    console.log(`Welcome, ${name}!`);
                    socket.emit('setUsername', name);
                    startChat(name, socket, rl);
                });
            });

            // Handle connection error when no server is hosted on the specified port
            socket.on('connect_error', () => {
                console.log(`\nNo server is hosted at ${url}:${port}, please try a different URL or port`);
                socket.close();
                rl.close();
                connectToServer();
            });

        } else {
            console.log('Failed to connect to server');
            return;
        }
    });
};

connectToServer();
