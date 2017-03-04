/*
 * AskTravel
 * Worldwide Traveler's Marketplace
 * http://asktravel.faisalman.com/
 * Copyright (c) TMD 2016
 */


/**************
 * requires *
 **************/

// libs
var express = require('express'),
    exphbs = require('express-handlebars'),
    session = require('express-session'),
    flash = require('express-flash'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    request = require('request'),
    nodemailer = require('nodemailer'),
    sequelize = require('sequelize'),
    passport = require('passport'),
    passportlocal = require('passport-local'),
    expressValidator = require('express-validator'),
    session = require('express-session');

// routes
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var itworks = require('./routes/itworks');
var resetpass = require('./routes/resetpass');
var forgotpass = require('./routes/forgotpass');
//var user = require('./routes/user');
//var settings = require('./routes/settings');
var messages = require('./routes/messages');

var category = require('./routes/category');
var country = require('./routes/country');
//var item = require('./routes/category');
var request = require('./routes/request');
var requestConfirmation = require('./routes/requestConfirmation');
//var offer = require('./routes/offer');
//var transaction = require('./routes/transaction');
var app = express();


/**************
 * helpers *
 **************/

var reqAuth = function(req, res, next) {
    /)next();
    //console.log('test');
    // console.log(req.session.passport.user);
    // console.log('test2');
    // console.log(req.user);
    // console.log(req.session.auth);
    // if (req.session.auth){
    if (req.user){
        next();
    } else {
        req.flash('error', 'Please Login to continue.');
        res.redirect('/login');
    }
};


/**************
 * configs *
 **************/

var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: 'views/partials/'
});
app.locals.mailer = nodemailer.createTransport('smtps://tukangposkilat%40gmail.com:p455w0rd123@smtp.gmail.com');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('x-powered-by', false);
app.set('salt', 'guramebakar');
app.set('port', 8003);
app.set('localUrl', 'http://localhost:' + app.get('port'));
app.set('appUrl', 'http://asktravel.faisalman.com');


/**************
 * middlewares *
 **************/

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.use(cookieParser('ayamgoreng'));
app.use(session({
    secret: 'sambelterasi',
    cookie: {maxAge: 9999999},
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(function(req, res, next) {
    res.locals.isLogin  = !!req.session.auth;
    res.locals.username = req.session.username;
    //res.locals.query    = req.query;
    //res.locals.url      = req.originalUrl;
    console.log(req.session.auth);
    next();
});
app.use(passport.initialize());
app.use(passport.session());

/**************
 * routings *
 **************/

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/itworks', itworks);
app.use('/resetpass', resetpass);
app.use('/forgotpass', forgotpass);
//app.use('/user', team);
//app.use('/item', team);
app.use('/browse/category', category);
app.use('/browse/country', country);
//app.use('/browse/search', search);

//app.use('/offer', reqAuth, offer);
app.use('/request', request);
app.use('/requestConfirmation', requestConfirmation);
// app.use('/request',reqAuth, request);
// app.use('/requestConfirmation',reqAuth, requestConfirmation);
//app.use('/transaction', reqAuth, transaction);
app.use('/messages', messages);
//app.use('/settings', reqAuth, settings);


app.get('/login', function(req, res, next) {
    req.session.user = {
        id: 1
    };
    res.redirect('/messages');
});

app.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

// error 404
app.use(function(req, res, next) {
    res.status(404).render('pesan', {
        title: 'Halaman tidak ditemukan',
        pesan: {
            icon: 'bug',
            judul: 'Error [404]',
            deskripsi: 'Maaf, halaman yang anda cari tidak ditemukan.'
        }
    });
});

// error 500
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).render('pesan', {
        title: 'Terjadi kesalahan',
        pesan: {
            icon: 'bug',
            judul: 'Error [500]',
            deskripsi: 'Maaf, terjadi kesalahan pada server kami. Silakan coba kembali setelah beberapa saat.'
        }
    });
});


/**************
 * run server *
 **************/

app.listen(app.get('port'), function() {
    console.log('server berjalan di ' + app.get('localUrl'));
});


module.exports = app;
