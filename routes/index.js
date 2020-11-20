var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/style', function(req, res, next) {
  res.render('styleGuide');
});

module.exports = router;
