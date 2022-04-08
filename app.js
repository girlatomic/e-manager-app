var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var clientsRouter = require('./routes/clients');
var repairsRouter = require('./routes/repairs');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth.js');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/clients', clientsRouter);
app.use('/repairs', repairsRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

module.exports = app;
