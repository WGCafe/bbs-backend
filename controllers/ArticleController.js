const Article = require('../models/Article');

const ArticleController = {
  insert: function(req, res) {
    const { article } = req.body;
    const article = new Article(article);

    article.save();
  }
};

module.exports = ArticleController;