var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var surveyRouter = require('./routes/survey');
var searchRouter = require('./routes/searchResult');
var reportRouter = require('./routes/report');
var shareRouter = require('./routes/shareResults');

var app = express();

//sass

var sass = require('node-sass');
const fs = require('fs');

sass.render({
    file: 'scss/custom.scss',
    outFile: 'public/stylesheets/shared.css'
}, function (err, result) {
    if (!err) {
        fs.writeFile('public/stylesheets/shared.css', result.css, function (err) {
            if (!err) {
                //file written on disk
                console.log("css generated");
            } else {
                console.log(err);
            }
        });
    } else {
        console.log(err);
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey',surveyRouter);
app.use('/searchresult', searchRouter);
app.use('/report', reportRouter);
app.use('/share', shareRouter)

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

module.exports = app;
