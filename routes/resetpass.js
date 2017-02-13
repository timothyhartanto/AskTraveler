var express = require('express');
var router = express.Router();
var models = require('../models');
var sql = models.sequelize;
var bcrypt = require('bcrypt-nodejs');
var app = express();


router.get('/:token', function(req, res, next) {
	models.user.find({where: {userToken: req.params.token}}).then(function (user) {
		if (!user) {
			req.flash('error', 'Password reset token is invalid.');
     		return res.redirect('/forgotpass');
		}
		res.render('resetpass', {errorMessage: req.flash('error'), okMessage: req.flash('ok')});
	});
});

router.post('/:token', function(req, res, next) {
	console.log('test');
	if(req.body.password !== req.body.repeatPassword){
		return done(null, false, { errorMessage: req.flash('error', 'Your password does not match!') });
	}
	else{
		var pass = bcrypt.hashSync(req.body.password);
		var insertQuery = "UPDATE user SET password = '" + pass +"' WHERE passwordToken = '"+req.params.token+"' ";
        sql.query(insertQuery).then(function(err){
        	console.log('why');
        	req.flash('ok', 'Password has been reset! Please re-login.');
        	res.redirect('/login');
        });
	}
});

module.exports = router;

