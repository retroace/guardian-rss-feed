const logger = require('morgan');
const fs = require('fs');
const path = require('path');

const date = (new Date()).toISOString();

// Generates file name based on dates
const filename = `${date.substr(0,10)}.log`;

const logPath = path.join(__dirname, `/../logs/${filename}`)
const accessLogStream = fs.createWriteStream(logPath,{ flags: 'a' });

// Standard Apache combined log output.
module.exports = logger('combined', { stream: accessLogStream });
