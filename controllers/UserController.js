const User = require('../models/User');

const UserController = {
  insert: function(req, res) {
    const {
      username,
      email,
      password
    } = req.body;
    const user = new User({
      username,
      email,
      password,
      create_time: new Date()
    });
    const query = User.find({ email });

    query.exec((err, docs) => {
      if (!docs) {
        user.save();

        res.json({
          status: 1000,
          context: 'success'
        });
      } else {
        res.json({
          status: 500,
          context: 'This email is exist.'
        });
      }
    });
  },

  Login: function(req, res) {
    const {
      email,
      password
    } = req.body;

    User.find({
      email,
      password
    }).exec((err, docs) => {
      res.json({
        status: 1000,
        context: 'success'
      });
    });
  },

  resetPassword: function(req, res) {
    const {
      user_id,
      password
    } = req.body;

    User.find({
      user_id,
      password
    }).exec((err, docs) => {
      res.json({
        status: 1000,
        context: 'success'
      });
    });
  },

  findOne: function(req, res) {
    const { params } = req;

    if (!params.user_id) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    User.find({ _id: params.user_id }).exec((err, docs) => {
      res.json({
        status: 1000,
        context: docs
      });
    });
  },

  updateUser: function(req, res) {
    const {
      params,
      body
    } = req;

    if (!params.user_id || !body.updateUser) {
      res.json({
        status: 500,
        context: 'Bad request'
      });

      return;
    }

    User.findOneAndUpdate({ _id: params.user_id}, body.updateUser, (err, docs) => {
      res.json({
        status: 1000,
        context: docs
      });
    });
  }
};

module.exports = UserController;