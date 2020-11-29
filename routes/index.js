var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});


router.get('/style', function(req, res, next) {
  res.render('styleGuide');
});

router.get('/home', function(req, res, next) {
  res.render('home', {title: 'Home'});
});

router.get('/search', function(req, res, next) {
  res.render('search', {title: 'Pets Near Me'});
});


router.get('/interact', function(req, res, next) {
  res.render('interact');
});

module.exports = router;
