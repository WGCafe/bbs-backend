const Comment = require('../models/Comment');

const CommentController = {
  insert: function(req, res) {
    const {
      article_id,
      comment_id,
      source_comment,
      user_id,
      content
    } = req.body;
    const commnet = new Comment({
      article_id,
      comment_id,
      source_comment,
      user_id,
      content,
      create_time: new Date()
    });

    commnet.save();

    res.json({
      status: 1000,
      context: 'success'
    });
  },

  deleteOne: function(req, res) {
    const { params } = req;

    if (!params.comment_id) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    Comment.deleteOne({ _id: params.comment_id }).exec((err, docs) => {
      res.json({
        status: 1000,
        context: 'success'
      });
    });
  },

  updateOne: function(req, res) {
    const { params } = req;

    if (!params.comment_id) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    Comment.findOneAndUpdate({ _id: params.comment_id}, {
      is_thanks: true
    }, () => {
      res.json({
        status: 1000,
        context: 'success'
      });
    });
  },

  fetchAll: function(req, res) {
    const {params} = req;

    if (!params.article_id) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    Comment.find({article_id: params.article_id}, function (err, docs) {
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
  }
};

module.exports = CommentController;