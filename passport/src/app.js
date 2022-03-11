require('dotenv').config();
require('./config/passport');
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/auth.route');
const app = express();
var bodyParser = require('body-parser')
const cookieSession = require('cookie-session');
const passport = require('passport');

app.use(bodyParser.json())
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['clave'] //clave para encriptar
}));

 //inicializar passport
app.use(passport.initialize());
app.use(passport.session());   

// view engine setup
var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, './public/html'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('home') 
});
app.use('/', indexRouter);

module.exports = app;
