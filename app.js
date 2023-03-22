var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
var indexRouter = require('./routes/index');
const klientRouter = require('./routes/klientRoute');
const uslugaRouter = require('./routes/uslugaRoute');
const wizytaRouter = require('./routes/wizytaRoute');
const klApiRouter = require('./routes/api/klientApiRoute');
const usluApiRouter = require('./routes/api/uslugaApiRoute');
const wizyApiRouter = require('./routes/api/wizytaApiRoute');

const sequelizeInit = require('./config/sequelize/init');

const i18n = require('i18n');
i18n.configure({
  locales: ['pl', 'en'],
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  cookie: 'acme-hr-lang',
});


sequelizeInit()
  .catch(err => {
    console.log(err);
  });



//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(i18n.init);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const fmt = require('../tin-projekt-nguyen-s20470/public/js/dateFormatting');
const { permitAuthenticatedUser } = require('./util/authUtils');
app.use((req, res, next) => {
  res.locals.fmt = fmt;
  next();
});

app.use(session({
  secret: 'my_secret_password',
  resave: false
}));

// req.session.loggedUser = kl;

app.use((req, res, next) => {
  const loggedUser = req.session.loggedUser;
  res.locals.loggedUser = loggedUser;
  if (!res.locals.loginError) {
    res.locals.loginError = undefined;
  }
  next();
});

app.use(cookieParser('secret'));

app.use((req, res, next) => {
  if (!res.locals.lang) {
    const currentLang = req.cookies['acme-hr-lang'];
    res.locals.lang = currentLang;
  }
  next();
});
app.use('/', indexRouter);
app.use('/klient', klientRouter);
// app.use('/klient', permitAuthenticatedUser, klientRouter);
app.use('/usluga', uslugaRouter);
app.use('/wizyta', wizytaRouter);
app.use('/api/klient', klApiRouter);
app.use('/api/usluga', usluApiRouter);
app.use('/api/wizyta', wizyApiRouter);




//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
