var express = require('express');
var router = express.Router();
var CatController = require('../controllers/CatController');
var ArticleTypeController  = require('../controllers/ArticleTypeController');
var ArticleController = require('../controllers/ArticleController');
var UserController = require('../controllers/UserController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'hello world'});
});

router.get('/api/cats', CatController.fetchAll);
router.get('/api/articletype', ArticleTypeController.fetchAll);
router.post('/api/articletypes-init', ArticleTypeController.init);

router.post('/api/login', UserController.Login);
router.post('/api/resetpassword', UserController.resetPassword);
router.get('/api/users/:user_id', UserController.findOne);
router.put('/api/users/:user_id', UserController.updateUser);
router.post('/api/users', UserController.insert);

router.post('/api/article', ArticleController.insert);

module.exports = router;
