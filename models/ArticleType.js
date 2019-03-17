const mongoose = require('mongoose');

const ArticleType = mongoose.model('ArticleType', {
  id: Number,
  name: String
});

module.exports = ArticleType;
