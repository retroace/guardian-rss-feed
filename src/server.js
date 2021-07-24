const path = require('path');
const express = require('express');
const loggerService = require('./services/loggerService');

// Article routes
const indexRouter = require('./routes/articles');

const app = express();
app.use(loggerService.expressLog);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.status(200).json({ success: 'Rss feed' }));
app.use(indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  return res.status(404).json({ error: 'Not found' });
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  loggerService.log(err.message);
  if (err.status === 404) {
    return res.status(404).json({ error: 'Not found' });
  }
  // render the error page
  return res.status(err.status || 500).json({ error: 'error' });
});

module.exports = app;
