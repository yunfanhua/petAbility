var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('search-result', {title: 'Pets Near Me'});
});

router.get('/strawberry', function(req, res, next) {
    res.render('search-result-dog1', {title: 'Strawberry'});
});

router.get('/chocolate', function(req, res, next) {
    res.render('search-result-dog2', {title: 'Chocolate'});
});


module.exports = router;