const mongoose = require('mongoose');



const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},{
  timestamps: true
});

commentSchema.methods.belongsTo = function commentBelongsTo(user) {
  if(typeof this.createdBy.id === 'string')
    return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();

};

const poetSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String, required: true },
  reason: { type: String, required: true },
  recommend: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'},
  comments: [commentSchema]

});

poetSchema.methods.belongsTo = function poetBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Poet', poetSchema);
