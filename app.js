require('dotenv').config();
const _           = require('lodash');
const express     = require('express');
const path        = require('path');
const favicon     = require('serve-favicon');
const logger      = require('morgan');
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
const cors        = require('cors');

const passport    = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt  = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const config = require('./config');
const index  = require('./routes/index');
const auth   = require('./routes/auth');
const users  = require('./routes/users');
const todos  = require('./routes/todos');
const api    = require('./routes/api');

const app = express();

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
mongoose.connect(process.env.DB_HOST).then(
  () => console.log('database connected'),
  err => console.log('database connection error ' + err);
);


// ************************************ //
//              CORS IN DEV             //
// ************************************ //
// if (app.get('env') === 'development') app.use(cors());
app.use(cors());


// ************************************ //
//                 AUTH                 //
// ************************************ //

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'magicsound';

var strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
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
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
