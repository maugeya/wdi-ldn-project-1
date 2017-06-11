const mongoose = require('mongoose');

const poetSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String, required: true },
  reason: { type: String, required: true },
  recommend: { type: String }

});

poetSchema.methods.belongsTo = function postBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Poet', poetSchema);
