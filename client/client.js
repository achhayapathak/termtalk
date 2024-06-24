#!/usr/bin/env node

const ioClient = require('socket.io-client');
const readline = require('readline');

const startChat = require('./chat');
const promptPort = require('./promptPort');


promptPort((PORT) => {
    if(PORT) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log(`Trying to connect to server on PORT ${PORT} ...`);

        const socket = ioClient.connect(`http://127.0.0.1:${PORT}`);

        socket.on('connect', () => {
            console.log(`Connected to server on PORT ${PORT}`);
            rl.question('Enter your name: ', name => {
                console.log(`Welcome, ${name}!`);
                socket.emit('setUsername', name);
                startChat(name, socket, rl);
            });
        });
    } else {
        console.log('Failed to connect to server server');
        return;
    }
});