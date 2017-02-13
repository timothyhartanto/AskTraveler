var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var passportlocal = require('passport-local');
var models = require('../models');
var Handlebars = require('handlebars');
var sql = models.sequelize;
var itemName;
var quantity;
var URLItem;
var itemDescription;
var countryId;
var categoryId;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET request confirmation page */
router.get('/', function(req, res, next) {
 
    itemName = req.query.itemName;
    quantity = req.query.quantity;
    URLItem = req.query.URLItem;
    itemDescription = req.query.itemDescription;
    countryId = req.query.countryId;
    categoryId = req.query.categoryId;

    sql.query("select countryName from country where id = '" + countryId + "'").then(function(countries){
        sql.query("select categoryName from category where id = '" + categoryId + "'").then(function(categories) {
                res.render('requestConfirmation', {
                	user : req.user,
                    itemName : req.query.itemName,
                    quantity : req.query.quantity,
                    URLItem : req.query.URLItem,
                    itemDescription : req.query.itemDescription,
                    categories: categories[0],
                    countries: countries[0]
                });
        });
    })
});

router.post('/', function(req, res){
    if(req.body.tc){
        // create the item
        var newUserMysql = new Object();
        newUserMysql.itemName = itemName;
        newUserMysql.quantity = quantity;
        newUserMysql.URLItem = URLItem;
        newUserMysql.description = itemDescription;
        newUserMysql.idCountry = countryId;
        newUserMysql.idCategory = categoryId;

        var insertQuery = "INSERT INTO item ( itemName, quantity, URLItem, description, idCategory, idCountry ) values ('" + itemName +"',  '"+ quantity+"', '"+ URLItem+"', '"+ itemDescription +"', '"+ categoryId +"', '"+ countryId +"')";

        sql.query(insertQuery).then(function(err,rows) {
            if(err){
                return console.log(err);
            }
        });
        req.flash('ok', 'Your request has been placed.');
        res.redirect('/request');
    }
    else{
        
        res.redirect('/requestConfirmation/?itemName=' + itemName + '&quantity=' + quantity + '&URLItem=' + URLItem + '&itemDescription=' + itemDescription + '&countryId=' + countryId + '&categoryId=' + categoryId);
    }
});


module.exports = router;