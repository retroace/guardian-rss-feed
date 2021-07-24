const path = require('path');
const express = require('express');
const createError = require('http-errors');
const loggerService = require('./services/loggerService');

const app = express();

app.use(loggerService);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => res.status(200).json({ success: 'Rss feed' }));


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(err.status == 404) {
    res.status(404).json({error : 'Not found'});
  }
  // render the error page
  res.status(err.status || 500).json({error : 'error'});
});

module.exports = app;
