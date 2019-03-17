const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: String,
  user_id: String,
  email: String,
  password: String,
  location: String,
  face_image: String,
  create_time: Date
});

module.exports = User;