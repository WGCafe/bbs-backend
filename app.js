var createError = require('http-errors');
var express = require('express');
var passport = require('passport');
var path = require('path');
var bodyParser = require('cookie-parser');
var logger = require('morgan');
var localStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/server', {useNewUrlParser: true});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'lanya.bbs.me',
  cookie: {
    maxAge: 600000
  }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.json({
    error: res.locals.error,
    message: err.message
  });
});

passport.use('local', new localStrategy(
  function (email, password, done) {
      User.findOne({
        email: 'admin',
        password: 'pass'
      }, function (err, user) {
        if (email !== user.email) {
            return done(null, false, { message: 'Incorrect email.' });
        }
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      });
  }
));

passport.serializeUser(function (user, done) {//保存user对象
  done(null, user);//可以通过数据库方式操作
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = app;
