var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('share-results',{title: "Share With Shelters"});
});
  
router.get('/location', function(req, res, next) {
    res.render('shelter-search', {title: "Share With Shelters"});
});

router.get('/shelters', function(req, res, next) {
    res.render('select-shelter', {title: "Share With Shelters"});
});

router.get('/form', function(req, res, next) {
    res.render('share-form', {title: "Share With Shelters"});
});

router.get('/contact', function(req, res, next) {
    res.render('share-contact', {title: "Share With Shelters"});
});

router.get('/success', function(req, res, next) {
    res.render('share-success', {title: "Share With Shelters"});
});
  


module.exports = router;