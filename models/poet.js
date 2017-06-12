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

poetSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

poetSchema.methods.belongsTo = function poetBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Poet', poetSchema);
