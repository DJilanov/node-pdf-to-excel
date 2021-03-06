// Import the watching library
const watchr = require('watchr');
const pdfReader = require('./pdfReader');

// Get our path
const path = process.argv[process.argv.length - 1];


function listener(changeType, fullPath, currentStat, previousStat) {
    let split = fullPath.split('.');
    let ending = split[split.length - 1];
    if (ending.toLowerCase() !== 'pdf') {
        return;
    }
    if (changeType === 'create') {
        pdfReader.parsePdfData(fullPath);
    }
}

function next (err) {
	if ( err ) {
        return console.log('watch failed on', path, 'with error', err)
    } else {
        console.log('watch successful on', path)
    }
}

const stalker = watchr.open(path, listener, next);

// Set the default configuration for the stalker/watcher
// http://rawgit.com/bevry/watchr/master/docs/index.html#Watcher%23setConfig
stalker.setConfig({
    stat: null,
    interval: 5000,
    persistent: true,
    catchupDelay: 2000,
    preferredMethods: ['watch', 'watchFile'],
    followLinks: true,
    ignorePaths: false,
    ignoreHiddenFiles: true,
    ignoreCommonPatterns: true,
    ignoreCustomPatterns: null
});