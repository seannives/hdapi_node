/* Herp Derp API in node.js
 *
 *  This should eventually spin up as a proper server with API but for the 
 *  time being we'll just feed text files into hdapi.js and this will
 *  herp-derp-ify them.
 */

const fs = require('fs');
const commandLineArgs = require('command-line-args');

// Define our command line options
const optionDefinitions = [
    { name: 'input', type: String, multiple: true, defaultOption: true },
]
// Suck in our options, if we have any
const options = commandLineArgs(optionDefinitions);



if (options.input) {
    // Run this as command line
    console.log("Running as command line");
    console.log("Processing files " + options.input);

} else {
    // Run as a server
    // TODO - change this to bunyan or winston logging
    console.log("Running as server");
}

