var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/welcome', function(req, res, next) {
  res.render('survey/welcome');
});

router.get('/skip', function(req, res, next) {
  res.render('skip', {title: 'Home'});
});

router.get('/style', function(req, res, next) {
  res.render('styleGuide');
});

router.get('/home', function(req, res, next) {
  res.render('home', {title: 'Home'});
});

router.get('/search', function(req, res, next) {
  res.render('search/search', {title: 'Pets Near Me'});
});


module.exports = router;
