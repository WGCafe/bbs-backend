const mongoose = require('mongoose');

const Comment = mongoose.model('Comment', {
  author_id: ObjectId,
  content: String,
  source_comment: String,
  create_time: Date,
  collection_num: Number,
  thanks_num: Number,
  is_collection: Boolean,
  is_thanks: Boolean
});

module.exports = Comment;