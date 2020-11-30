var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('report', {title: 'Performance Report'});
});
router.get('/feed', function(req, res, next) {
    res.render('feedReport', {title: 'Performance Report'});
});
router.get('/exercise', function(req, res, next) {
    res.render('exerciseReport', {title: 'Performance Report'});
});
router.get('/hygiene', function(req, res, next) {
    res.render('hygieneReport', {title: 'Performance Report'});
});
router.get('/happiness', function(req, res, next) {
    res.render('happinessReport', {title: 'Performance Report'});
});


module.exports = router;