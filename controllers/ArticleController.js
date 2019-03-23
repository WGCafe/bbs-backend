const Article = require('../models/Article');

const ArticleController = {
  insert: function(req, res) {
    const {
      author_id,
      title,
      content,
      image,
      category
    } = req.body;
    const article = new Article({
      author_id,
      title,
      content,
      image,
      category,
      thanks_num: 0,
      collection_num: 0,
      comment_num: 0,
      create_time: new Date(),
      vote_up: 0,
      vote_down: 0,
      is_collection: false,
      is_reported: false
    });

    article.save();

    res.json({
      status: 1000,
      context: 'success'
    });
  },

  deletOne: function(req, res) {
    const { params } = req;

    if (!params.article_id) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    Article.find({ _id: article_id }).exec((err, docs) => {
      res.json({
        status: 1000,
        context: 'success'
      });
    });
  },

  fetchOne: function(req, res) {
    const { params } = req;

    if (!params.article_id) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    Article.find({ _id: params.article_id }).exec((err, docs) => {
      if (err) {
        res.json({
          status: 404,
          context: 'No exist'
        });
      } else {
        res.json({
          status: 1000,
          context: docs
        });
      }
    });
  },

  reportArticle: function(req, res) {
    const {
      params,
      body
    } = req;

    if (!params.article_id || !body.reason) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    Article.findOneAndUpdate({ _id: article_id}, {
      report_reason: reason,
      is_reported: true
    }, (err, docs) => {
      res.json({
        status: 1000,
        context: docs
      });
    });
  },

  fetchAll: function(req, res) {
    const {
      category,
      page_size,
      page
    } = req.body;

    Article.find({
      category
    }).skip(page * page_size).limit(page_size).exec(function (err, docs) {
      if (err) {
        res.json({
          status: 500,
          context: 'Bad request'
        });
      }
      else {
        res.json({
          status: 1000,
          context: docs
        });
      }
    });
  }
};

module.exports = ArticleController;