const mongoose = require('mongoose');

const Collection = mongoose.model('Collection', {
  article_id: ObjectId,
  collectors: Array
});

module.exports = Collection;
