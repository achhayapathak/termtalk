const prompt = require('prompt');

// function to get PORT from user to connect to server
const getPort = (callback) => {
    prompt.start();

    console.log('Enter port number of the host server');

    prompt.get([ 'port' ], (error, result) => {

        if(error) {
            console.log('Error, Couldn\'t get PORT number from STDin');
            callback(null)
        }else{
            const PORT = parseInt(result.port)

            callback(PORT)
        }   

    });
};

module.exports = getPort