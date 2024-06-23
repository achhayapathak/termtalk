const prompt = require('prompt');
const portScanner = require('portscanner');

// function to check if port is valid
const checkPortStatus = (port, callback) => {
    portScanner.checkPortStatus(port, '127.0.0.1', (error, status) => {

        if(error) {
            console.log('Error while scanning PORTS');
            callback(null);
        }
        else if(status === 'open') {
            console.log(`Error, PORT ${port} is already in use`);
            callback(null);
        }
        else {
            callback(port);
        }

    });
};

// function to get port number to host the chat server
const getPortNumber = (callback) => {
    prompt.start();

    console.log('Enter the PORT number where the server should be hosted');

    prompt.get([ 'port' ], (error, result) => {

        if(error) {
            console.log('Error, Couldn\'t get PORT number from STDin');
            callback(null);
        }
        else {
            const PORT = parseInt(result.port);

            // check if port number is valid
            if(isNaN(PORT) || PORT < 1025 || PORT > 65535) {
                console.log('Enter a valid PORT number');
                callback(null);
            }
            else {
                // check if port is in use already
                checkPortStatus(PORT, callback);

            }
        }

    });
};

module.exports = getPortNumber;