var express = require('express');
var router = express.Router();


// GET - show main articles page
router.get('/', function(req, res, next) {
    res.render('articles/index', {
        title: 'Articles'
    });
});

// make this public
module.exports = router;
