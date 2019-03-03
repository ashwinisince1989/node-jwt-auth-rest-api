var express = require('express');
var logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();
var usersRouter = require('./api/routes/user');
var leaderRouter = require('./api/routes/leader');
var partyRouter = require('./api/routes/party');
//db configuration
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongodb hosted on AWS by mLab
mongoose.connect('mongodb://ashwini:ashwini123@ds149365.mlab.com:49365/janpatrika')
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

//middleware set up
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', usersRouter);
app.use('/leader', leaderRouter);
app.use('/party', partyRouter);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
