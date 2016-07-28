/* Herp Derp API in node.js
 *
 *  This should eventually spin up as a proper server with API but for the 
 *  time being we'll just feed text files into hdapi.js and this will
 *  herp-derp-ify them.
 */

const Promise = require('bluebird');
// note - this turns fs.readFile into fs.readFileAsync
const fs = Promise.promisifyAll(require('fs'));
const commandLineArgs = require('command-line-args');

// Define our command line options
const optionDefinitions = [
    { name: 'input', type: String, multiple: true, defaultOption: true },
]
// Suck in our options, if we have any
const options = commandLineArgs(optionDefinitions);

// Run this as command line if we've got files as input
if (options.input) {

    console.log("Running as command line");
    console.log("Processing files " + options.input);

    // Iterate over all of our text inputs
    options.input.forEach(function(entry) {
        // Read in our file
        fs.readFileAsync(entry, 'utf8')
        // HerpDerpify the file
        .then(function(data) {
            console.log('yeah');
            return herpDerpfiy(data);
        })
        // Spit back out the HerpDerpified version
        .then(function(data) {
            console.log(data);
        })
    })

// Otherwise, run as a server
} else {

    // TODO - change this to bunyan or winston logging
    console.log("Running as server");
}

// Split up some text and add some herps and derps.
function herpDerpfiy(text) {
    return new Promise(function(resolve, reject) {
        resolve(text);
    })
}
