#!/usr/bin/env node

const ioClient = require('socket.io-client');
const readline = require('readline');
const startChat = require('./chat');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const socket = ioClient.connect('http://127.0.0.1:12345');

socket.on('connect', () => {
  console.log('Connected to server');
  rl.question('Enter your name: ', name => {
    console.log(`Welcome, ${name}!`);
    socket.emit('setUsername', name);
    startChat(name, socket, rl);
  });
});