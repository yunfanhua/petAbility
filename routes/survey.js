var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/1', function(req, res, next) {
    res.render('survey/survey', {title: 'Survey', question: 'Have you ever raised a pet before?',
    choices: ["YES", "NO"], currentProgress:20});
});

router.get('/2', function(req, res, next) {
    res.render('survey/survey', {title: 'Survey', question: 'What size is your perfect pet?',
        choices: ["SMALL", "MEDIUM", "LARGE"], currentProgress:40});
});

router.get('/3', function(req, res, next) {
    res.render('survey/survey', {title: 'Survey', question: 'Where do you live?',
        choices: ["URBAN AREA", "SUBURB", "FARM"], currentProgress:60});
});

router.get('/4', function(req, res, next) {
    res.render('survey/survey', {title: 'Survey', question: 'How active is your lifestyle?',
        choices: ["NOT ACTIVE AT ALL", "EXERCISE OCCASIONALLY", "WORKOUT EVERYDAY"], currentProgress:80});
});

router.get('/5', function(req, res, next) {
    res.render('survey/survey', {title: 'Survey', question: 'Are you allergic to pet hair?',
        choices: ["YES", "NO"], currentProgress:100});
});

router.get('/result', function(req, res, next) {
    res.render('survey/survey-result', {title: 'Survey Result'});
});


module.exports = router;
