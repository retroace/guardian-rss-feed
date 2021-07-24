const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const date = (new Date()).toISOString();

// Generates file name based on dates
const filename = `${date.substr(0, 10)}.log`;

const logPath = path.join(__dirname, `/../logs/${filename}`);
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });

const customLogPath = path.join(__dirname, `/../logs/user_${filename}`);
const customAccessLogStream = fs.createWriteStream(customLogPath, { flags: 'a' });

// Standard Apache combined log output.
module.exports = {
  log: (message) => {
    Readable.from(message).pipe(customAccessLogStream);
  },
  expressLog: logger('combined', { stream: accessLogStream }),
};
