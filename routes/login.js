var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportlocal = require('passport-local');
var models = require('../models');
var sql = models.sequelize;
var bcrypt = require('bcrypt-nodejs');

/* GET login page */
router.get('/', function(req, res, next) {
    res.render('login', {errorMessage: req.flash('error'), okMessage: req.flash('ok')});
});


passport.use('local-login', new passportlocal.Strategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done){

    models.user.sync().then(function () {
       sql.query("select * from user where email = '" + email + "'").then(function(users){
        console.log(users[0]);
            if(users[0].forEach(function(res) {
                if(res.verified > 0){
                    if(bcrypt.compareSync(password, res.password)){
                        console.log('logged in');
                        // done(null, {id: res.firstName, user: res.firstName});   
                        done(null, {username: res.firstName});   
                        return;           
                    }
                    else{
                        console.error('wrong password');
                        done(null, false, { errorMessage: req.flash('error', 'Wrong email address or password') });
                        return;
                    }
                }
                else{
                    console.error('not verified');
                        done(null, false, { errorMessage: req.flash('error', 'Your account is not verified. Please check your email.') });
                        return;
                }
            })){}
            // else{
            //     console.error('wrong');
            //     done(null, false, { errorMessage: req.flash('error', 'Wrong email address or password') });
            //     return;
            // }
        })
    })
}));

// passport.serializeUser(function(user, done){
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done){
//         User.findById(id, function(err, user){
//             done(err, user);
//         });
//     done(null, {id: id});
// });


passport.serializeUser(function(user, done){
    done(null, user.id, user.name);
});

passport.deserializeUser(function(id, name, done){
    // console.log(name);
    done(null, {id: id, name: name.username});
});

var session = function (req, res) {
    var temp = req.session.passport; // {user: 1}
    req.session.regenerate(function(err){
        //req.session.passport is now undefined
        req.session.passport = temp;
        req.session.save(function(err){
            res.send(200);
        });
    });
};

router.post('/',
  passport.authenticate('local-login', { successRedirect: '/',
                                   failureRedirect: '/login' }));


module.exports = router;