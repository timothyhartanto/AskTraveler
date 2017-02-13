var express = require('express');
var router = express.Router();
var models = require('../models');
var sql = models.sequelize;
var Handlebars = require('handlebars');

router.get('/', function(req,res,next){
        models.country.sync().then(function(){
            sql.query("select * from country join item on country.id = item.idCountry where item.id is not null")
                .then(function (items) {
                    sql.query("select * from country").then(function(countries){
                        res.render('country', {
                            items: items[0], countries: countries[0]
                        });
                    });
                });
        });
    })
    .get('/with/:id', function(req, res, next){
        var id = req.params.id;
        models.item.sync().then(function () {
            console.log(id);
            sql.query("select * from country left join item on item.idCountry = country.id where country.countryName ='"+id+"'")
                .then(function (items) {
                    sql.query("select * from country").then(function(countries){
                        res.render('country-with', {
                            items: items[0], countries: countries[0]
                        });
                    });
                });
        });
    });

Handlebars.registerHelper('travelerIn', function(numTraveler, options) {
    console.log(numTraveler);
    var fnTrue = options.fn, 
        fnFalse = options.inverse;
    if( numTraveler > 0) {
        return fnTrue(this);
    } else {
        return fnFalse(this);
    }
});

module.exports = router;