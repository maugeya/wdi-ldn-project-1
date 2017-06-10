const mongoose = require('mongoose');

const poetSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String, required: true },
  reason: { type: String, required: true },
  recommend: { type: String }

});

module.exports = mongoose.model('Poet', poetSchema);
