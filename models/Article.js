const mongoose = require('mongoose');

const Article = mongoose.model('Article', {
  title: String,
  content: String,
  image: String,
  category: Number,
  thanks_num: Number,
  collection_num: Number,
  create_time: Date,
  comment_num: Number,
  is_reported: Boolean,
  report_reason: String,
  vote_up: Number,
  vote_down: Number,
  is_collection: Boolean
});

module.exports = Article;
