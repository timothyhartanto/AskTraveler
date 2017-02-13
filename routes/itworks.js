var express = require('express');
var router = express.Router();

/* GET How it works page. */
router.get('/', function(req, res, next) {
    res.render('itworks');
});

module.exports = router;