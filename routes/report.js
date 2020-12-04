var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('report/report', {title: 'Performance Report'});
});
router.get('/feed', function(req, res, next) {
    res.render('report/feedReport', {title: 'Performance Report'});
});
router.get('/exercise', function(req, res, next) {
    res.render('report/exerciseReport', {title: 'Performance Report'});
});
router.get('/hygiene', function(req, res, next) {
    res.render('report/hygieneReport', {title: 'Performance Report'});
});
router.get('/happiness', function(req, res, next) {
    res.render('report/happinessReport', {title: 'Performance Report'});
});


module.exports = router;