var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { 
    	user	: req.user,
        header  : {
            icon    : 'rocket',
            title   : 'AskTravel',
            desc    : 'Worldwide Traveler\'s Marketplace'
        } 
    });
});

module.exports = router;
