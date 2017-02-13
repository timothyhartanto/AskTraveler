var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var passportlocal = require('passport-local');
var models = require('../models');
var Handlebars = require('handlebars');
var sql = models.sequelize;
var app = express();
var expressValidator = require('express-validator');
var expressSession = require('express-session');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(expressValidator());
router.use(expressSession({secret : 'rahasia', saveUninitialized : false, resave : false}));

/* GET request page */
router.get('/', function(req, res, next) {
    sql.query("select * from country").then(function(countries){
        sql.query("select * from category").then(function(categories) {
                res.render('request', {
                	okMessage: req.flash('ok'),
                	user	: req.user,
                    countries: countries[0],
                    categories: categories[0],
                    itemName : req.session.itemName,
                    quantity : req.session.quantity,
                    // URLItem : req.session.URLItem,
                    itemDescription : req.session.itemDescription,
                    countryId : req.session.countryId,
                    categoryId : req.session.categoryId

                });
        });
    })

});


router.post('/', function(req, res){
    var itemName = req.body.itemName;
    var quantity = req.body.quantity;
    var URLItem = req.body.URLItem;
    var itemDescription = req.body.itemDescription;
    var countryId = req.body.country;
    var categoryId = req.body.category;

    //console.log("Item Name = '"+itemName+"', URL Item = '"+URLItem+"', item Description = '"+itemDescription+"', Country = '"+country+"', CountryID = '"+countryId+"'");
    // create the item
    // var newUserMysql = new Object();
    // newUserMysql.itemName = itemName;
    // newUserMysql.URLItem = URLItem;
    // newUserMysql.description = itemDescription;
    // newUserMysql.idCountry = countryId;
    // newUserMysql.idCategory = categoryId;

    // var insertQuery = "INSERT INTO item ( itemName, URLItem, description, idCountry, idCategory) values ('" + itemName +"', '"+ URLItem+"', '"+ itemDescription +"', '"+ countryId +"', '"+ categoryId +"')";

    // sql.query(insertQuery).then(function(err,rows) {
    //     if(err){
    //         return console.log(err);
    //     }
    // });
    // res.send(itemName + ' ' + URLItem + ' ' + itemDescription + ' ' +  countryId + ' ' + categoryId);
    // res.redirect('/requestConfirmation', {itemName, URLItem, itemDescription, countryId, categoryId});
    // res.send({itemName : req.body.itemName,
    //                 URLItem : req.body.URLItem,
    //                 itemDescription : req.body.itemDescription,
    //                 countryId : req.body.countryId,
    //                 categoryId : req.body.categoryId});

    req.check('itemName', 'Item Name must be filled!').notEmpty();
    req.check('quantity', 'Quantity must be filled!').notEmpty().isInt();
    // req.check('URLItem', 'URL Item must be filled!').notEmpty();
    req.check('itemDescription', 'Item Description must be filled!').notEmpty();
    req.check('country', 'Country must be filled!').notEmpty();
    req.check('category', 'category must be filled!').notEmpty();

    var errors = req.validationErrors();
    req.session.itemName = false;
	req.session.quantity = false;
    // req.session.URLItem = false;
    req.session.itemDescription = false;
    req.session.countryId = false;
    req.session.categoryId = false;

    if (errors) {
    	errors.forEach(function(el, i){
    		if(el.param == 'itemName'){
	    		req.session.itemName = true;
	    	}
	    	if(el.param == 'quantity'){
	    		req.session.quantity = true;
	    	}
	   		// if(el.param == 'URLItem'){
	     //    	req.session.URLItem = true;
	   		// }
	    	if(el.param == 'itemDescription'){
	        	req.session.itemDescription = true;
	    	}
	    	if(el.param == 'country'){
	       		req.session.countryId = true;
	    	}
	    	if(el.param == 'category'){
	        	req.session.categoryId = true;
	    	}
    	});

    	res.redirect('/request');
  	}
  	else{
  		
    	res.redirect('/requestConfirmation/?itemName=' + itemName + '&quantity=' + quantity + '&URLItem=' + URLItem + '&itemDescription=' + itemDescription + '&countryId=' + countryId + '&categoryId=' + categoryId);
	}
});


module.exports = router;