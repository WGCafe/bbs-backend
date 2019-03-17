const Article = require('../models/Article');

const ArticleController = {
  insert: function(req) {
    const { article } = req.body;
    const article = new Article(article);

    article.save();
  },

  deletOne: function(req) {
  }
};

module.exports = ArticleController;