const ArticleType = require('../models/ArticleType');

const DEFAULT_ARTICLE_TYPES = [{
  id: 1,
  name: "讨论"
},
{
  id: 2,
  name: "询问"
},
{
  id: 3,
  name: "牙医"
},
{
  id: 4,
  name: "牙套"
},
{
  id: 5,
  name: "智齿"
},
{
  id: 6,
  name: "种植"
}];

const ArticleTypeController = {
  init: function(req, res) {
    ArticleType.insertMany(DEFAULT_ARTICLE_TYPES, function(error) {
      if (err) {
        res.json({
          status: 500,
          context: error
        });
      } else {
        res.json({
          status: 1000,
          context: 'success'
        });
      }
    });
  },

  fetchAll: function(req, res) {
    ArticleType.find({}).exec((err, docs) => {
      res.json({ result: docs });
    });
  }
};

module.exports = ArticleTypeController;