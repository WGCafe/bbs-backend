const Cat = require('../models/Cat');

const CatController = {
  fetchAll: function(req, res) {
    Cat.find({}).exec((err, docs) => {
      res.json({ result: docs });
    });
  },
  insert: function(req, res) {
    const { name } = req.body;
    const cat = new Cat({ name });
    cat.save();
  }
};

module.exports = CatController;