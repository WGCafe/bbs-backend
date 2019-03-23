const Collection = require('../models/Collection');

const CollectionController = {
  insert: function(req, res) {
    const {
      params,
      body
    } = req;

    if (!params.article_id || !body.user_id) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    Collection.find({ _id: params.article_id }).exec((err, docs) => {
      if (!docs) {
        const collection = new Collection({
          author_id: params.author_id,
          collections: [body.user_id],
        });

        collection.save();

        res.json({
          status: 1000,
          context: 'success'
        });
      } else {
        docs.collections.push(body.user_id);

        res.json({
          status: 1000,
          context: 'success'
        });
      }
    });
  },

  deleteOne: function(req, res) {
    const {params} = req;

    if (!params.article_id) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    Collection.deleteOne({ article_id: params.article_id }, function (err) {
      if (err) {
        res.json({
          status: 404,
          context: 'No exist'
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
    const {
      page_size,
      page
    } = req.body;

    Collection.find().skip(page * page_size).limit(page_size).exec(function (err, docs) {
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

module.exports = CollectionController;
