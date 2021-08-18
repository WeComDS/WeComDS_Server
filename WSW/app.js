var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//라우팅
var indexRouter = require('./routes/index');
const user = require('./routes/user/index');
const review = require('./routes/reveiw/index');
const random = require('./routes/random/index');
const question = require('./routes/question/index');
const secret = require('./routes/secret/index');
const study = require('./routes/study/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//라우팅
app.use('/', indexRouter)
app.use('/user', user);
app.use('/review', review);
app.use('/random', random);
app.use('/question', question);
app.use('/secret', secret);
app.use('/study', study);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(port, () => console.log(`Listening on port ${port}`)); 

module.exports = app;
