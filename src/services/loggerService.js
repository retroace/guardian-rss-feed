const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const date = (new Date()).toISOString();

// Generates file name based on dates
const filename = `${date.substr(0, 10)}.log`;

const logPath = path.join(__dirname, `/../logs/${filename}`);
const accessLogStream = fs.createWriteStream(logPath, { flags: 'a' });


function logToCustomFormat(message, level = "LOG")
{
  let logTimestamp = +new Date();
  const customLogPath = path.join(__dirname, `/../logs/user_${filename}`);
  const customAccessLogStream = fs.createWriteStream(customLogPath, { flags: 'a' });

  if(typeof message == 'object') {
    message = JSON.stringify(message);
  }

  Readable.from(`\n Time:${logTimestamp} Level:${level} ${message}`).pipe(customAccessLogStream);

}

/**
 * Logger service provides custom log with different level log, info, debug,warn,error
 * @method log
 * @method info
 * @method error
 * @method debug
 * @method warn
 * @method expressLog Standard Apache combined log output for express
 */
module.exports = {
  log: (message) => {
    logToCustomFormat(message, "LOG");
  },
  info: (message) => {
    logToCustomFormat(message, "INFO");
  },
  error: (message) => {
    logToCustomFormat(message, "ERROR");
  },
  debug: (message) => {
    logToCustomFormat(message, "DEBUG");
  },
  warn: (message) => {
    logToCustomFormat(message, "WARN");
  },
  expressLog: logger('combined', { stream: accessLogStream }),
};
