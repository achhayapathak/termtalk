#!/usr/bin/env node

const io = require('socket.io');
const portScan = require('portscanner')
const prompt = require('prompt')

prompt.start()

console.log('Enter the PORT number to host the server')
prompt.get(['port'], (error, result) => {
    if(error){
        console.log('Error, Couldn\'t get the PORT number')
        return 
    }

    const PORT = parseInt(result.port)

    // check if port is valid
    if(isNaN(PORT) || PORT  < 1 || PORT > 65535){
        console.log('Enter a valid PORT number')
        return
    }

    //check if port is not in use
    portScan.checkPortStatus(PORT, '127.0.0.1', (error, status) => {

        if(error){
            console.log('Error while scanning PORTS')
            return
        }

        if(status === "open"){
            console.log(`Error, PORT ${PORT} is already in use`)
            return
        }

        // create socket.io server with user given PORT

        const server = io(PORT)
        console.log(`Server started on PORT ${PORT} \nWating for users to connect`)

        server.on('connect', socket => {
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
            });
          });

    })
})

