var _           = require('lodash');
var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var passport    = require('passport');
var passportJwt = require('passport-jwt');
var ExtractJwt  = passportJwt.ExtractJwt;
var JwtStrategy = passportJwt.Strategy;

var config = require('./config');
var index  = require('./routes/index');
var auth   = require('./routes/auth');
var users  = require('./routes/users');
var todos  = require('./routes/todos');
var api    = require('./routes/api');

var app = express();

// ************************************ //
//                CONFIG                //
// ************************************ //

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
mongoose.connect(config.database, function() {
  console.log('database connected');
});


// ************************************ //
//              CORS IN DEV             //
// ************************************ //
if (app.get('env') === 'development') {
  console.log('allow CORS in development');
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
}


// ************************************ //
//                 AUTH                 //
// ************************************ //

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'magicsound';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);

  // var user = users
})



// ************************************ //
//                ROUTES                //
// ************************************ //

app.use('/', index);
app.use('/api/authenticate', auth);
app.use('/api', api);
app.use('/api/todos', todos);
app.use('/api/users', users);


// ************************************ //
//                ERRORS                //
// ************************************ //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
