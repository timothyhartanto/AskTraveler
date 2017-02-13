var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportlocal = require('passport-local');
var nodemailer = require('nodemailer');
var models = require('../models');
var sql = models.sequelize;
var app = express();
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var async = require('async');

/* GET regsiter page */
router.get('/', function(req, res, next) {
    res.render('register', {errorMessage: req.flash('error'), okMessage: req.flash('ok')});
});

/* GET validating user page */
router.get('/:token', function(req, res, next) {
    models.user.find({where: {userToken: req.params.token}}).then(function (user) {
        if (!user) {
            req.flash('error', 'Oops! There is something wrong with the account verification.');
            return res.redirect('/register');
        }
        else{
            var insertQuery = "UPDATE user SET verified = '" + '1' +"' WHERE userToken = '"+ req.params.token+"' ";

            sql.query(insertQuery);
            req.flash('ok', 'Your account is verfied! Please login to continue.');
            return res.redirect('/login');
            // res.render('login', {errorMessage: req.flash('error'), okMessage: req.flash('ok')});
        }
    });
});

// Generates hash using bCrypt
// var createHash = function(password){
//  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
// }

app.locals.mailer = nodemailer.createTransport('smtps://tukangposkilat%40gmail.com:p455w0rd123@smtp.gmail.com');

passport.use('local-signup', new passportlocal.Strategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
function(req, email, password, done){
    var token;
    async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        token = buf.toString('hex');
        done(err, token);
      });
    }]);
    // models.user.sync().then(function () {
    models.user.find({where: {email: email}}).then(function (user) {
            console.log(user);
        if(!user){
            console.log('create');
            if(password !== req.body.repeatPassword){
                console.error('wrong password');
                return done(null, false, { message: req.flash('error', 'Your password does not match!') });
            }       
            else{ 
                // create the user
                var newUserMysql = new Object();
                newUserMysql.email = email;
                // newUserMysql.password = createHash(password);
                // var hash = bcrypt.hashSync("bacon");
                newUserMysql.password = bcrypt.hashSync(password);
                newUserMysql.firstName = req.body.firstName;
                newUserMysql.lastName = req.body.lastName;
                newUserMysql.phoneNum = req.body.phoneNumber;

                var insertQuery = "INSERT INTO user ( email, password, firstName, lastName, phoneNumber, userToken) values ('" + email +"', '"+ bcrypt.hashSync(password) +"', '"+ req.body.firstName +"','"+ req.body.lastName +"','"+ req.body.phoneNumber +"' , '" + token + "')";

                sql.query(insertQuery).then(function(err,rows){

                //nodemailer
                var mailOptions = {
                    to: email, // list of receivers
                    subject: 'Welcome to AskTravel', // Subject line
                    text: 'Hello ' + req.body.firstName + '!\n\n'+
                        'Thank you for joining us on AskTravel.\n\n'+
                        'Please verify your account by clicking the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + '/register/' + token + '\n\n'  // html body
                };

                // send mail with defined transport object
                app.locals.mailer.sendMail(mailOptions, function(error, info){
                    if(error){
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
                return done(null, newUserMysql, { okMessage: req.flash('ok', 'You are registered! Please check your email for verification.') });
                }); 
            }
        }
        else{
            console.log('error');
            return done(null, false, { errorMessage: req.flash('error', 'Email already registered') });
        }
        
   })
}));

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

router.post('/',
  passport.authenticate('local-signup', { successRedirect: '/login',
                                   failureRedirect: '/register' }));


module.exports = router;
