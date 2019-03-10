var express = require('express');
var router = express.Router();
var CatController = require('../controllers/CatController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'hello world'});
});

router.get('/cats', CatController.fetchAll);

module.exports = router;
