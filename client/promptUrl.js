const prompt = require('prompt');

// Function to prompt for server URL and port
const promptServerDetails = (callback) => {
    prompt.start();
    prompt.get(['url'], (err, result) => {

        // handle errors if any
        if (err) {
            console.log('Error getting server details:', err);
            return;
        }
        
        callback(result.url);
    });
};

module.exports = promptServerDetails