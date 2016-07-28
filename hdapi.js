/* Herp Derp API in node.js
 *
 *  This should eventually spin up as a proper server with API but for the 
 *  time being we'll just feed text files into hdapi.js and this will
 *  herp-derp-ify them.
 *
 * TODO:
 * - make herpDerpify better (see notes there)
 * - break herpDerpify off into a module
 * - mess with import vs require
 * - error handling
 * - testing!
 */
 
const Promise = require('bluebird');
// note - this turns fs.readFile into fs.readFileAsync
const fs = Promise.promisifyAll(require('fs'));
const commandLineArgs = require('command-line-args');

// Define our command line options
const optionDefinitions = [
    { name: 'input', type: String, multiple: true, defaultOption: true },
]
// Suck in our options, if we have any.  You could also just use
// process.argv but this is a little easier.
const options = commandLineArgs(optionDefinitions);

// Run this as command line if we've got files as input
if (options.input) {

    console.log("...Running as command line");
    console.log("...Processing files " + options.input + "\n\n");

    // Iterate over all of our text inputs
    options.input.forEach((entry) => {
        // Read in our file
        fs.readFileAsync(entry, 'utf8')
        // HerpDerpify the file
        .then((data) => {
            return herpDerpfiy(data);
        })
        // Spit back out the HerpDerpified version
        .then((data) => {
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
        // note - global replace requires a regular expression
        // Change all periods not followed by a word.
        const re_period = /\.\W/g;
        text = text.replace(re_period, '.  Herp derp.  ');
        // Change all commas to herp.
        const re_comma = /, /g;
        // TODO - you could change this to a function so that it's rotating 'herp' and 'derp'.
        text = text.replace(re_comma, ', herp, ');
        resolve(text);
    })
}
