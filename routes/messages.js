var express = require('express');
var router = express.Router();
var moment = require('moment');
var models = require('../models');
var sql = models.sequelize;

router.get('/', function(req, res, next) {
        models.messages.sync().then(function() {
            sql.query('select * from messages left join user on messages.idUserFrom=user.id')
                .then(function(msgs) {
                    msgs[0].forEach(function(msg) {
                        msg.tglFormat = moment(this.tgl).format('DD-MMM-YYYY');
                    });
                    res.render('messages', {
                        msgs: msgs[0]
                    });
                });
        });
    })
    .get('/with/:idUser', function(req, res, next) {
        res.render('messages-with', {});
    })
    .post('/with/:idUser', function(req, res, next) {
        models.messages.create({
            idUserFrom: req.session.user.id,
            idUserTo: req.params.idUser,
            tgl: new Date(),
            pesan: req.body.pesan
        }).then(function(msg) {
            res.redirect(req.originalUrl);
        });
    });

module.exports = router;