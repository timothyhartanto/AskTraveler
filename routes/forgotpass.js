var express = require('express');
var router = express.Router();
var models = require('../models');
var sql = models.sequelize;
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var app = express();
app.locals.mailer = nodemailer.createTransport('smtps://tukangposkilat%40gmail.com:p455w0rd123@smtp.gmail.com');

router.get('/', function(req, res, next) {
    res.render('forgotpass', {message: req.flash('error'), verifyMessage: req.flash('ok')});
});

router.post('/', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
  function(token, done) {
    models.user.find({where: {email: req.body.email}}).then(function (user) {
      if (!user) {
        console.log('ga ada');
        req.flash('error', 'No account with that email address exists.');
        return res.redirect('/forgotpass');
      }
      else{
        // user.passwordToken = token;
        var insertQuery = "UPDATE user SET userToken = '" + token +"' WHERE email = '"+req.body.email+"' ";

        sql.query(insertQuery).then(function(err,rows){
          var mailOptions = {
            to: req.body.email,
            subject: 'Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/resetpass/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };
          app.locals.mailer.sendMail(mailOptions, function(err) {
            req.flash('ok', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
            done(err, 'done');
          });
        });
      }
    });
  }
  ], function(err) {
    if (err) return next(err);
      console.log('ok');
      res.redirect('/forgotpass');
    });
});


module.exports = router;