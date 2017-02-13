var express = require('express');
var router = express.Router();
var models = require('../models');
var sql = models.sequelize;

router.get('/', function(req,res,next){
        models.category.sync().then(function(){
            sql.query("select * from category left join item on item.idCategory = category.id where category.id is not null")
                .then(function (items) {
                    sql.query("select * from category").then(function(categories){
                        res.render('category', {
                            items: items[0], categories: categories[0]
                        });
                        console.log(items[0]);
                    });
                });
        });
    })

    .get('/with/:id', function(req, res, next){
        var id = req.params.id;
        models.item.sync().then(function () {
            sql.query("select * from category left join item on item.idCategory = category.id where category.categoryName ='"+id+"'")
                .then(function (items) {
                    sql.query("select * from category").then(function(categories){
                        res.render('category-with', {
                            items: items[0], categories: categories[0]
                        });
                    });
                });
        });
    });



module.exports = router;