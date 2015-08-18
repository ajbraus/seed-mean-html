/*
 * POST MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
    created_at  : { type: Date }
  , updated_at  : { type: Date }
  , body        : { type: String, required: true, trim: true }
});

// BEFORE/AFTER FILTER
PostSchema.pre('save', function(next){
  // SET CREATED_AT AND UPDATED_AT
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();

  // ENCRYPT PASSWORD
  if (this.password) {
    var md5 = crypto.createHash('md5');
    this.password = md5.update(this.password).digest('hex');
  }
  next();
});

// EXPORT POST MODEL
mongoose.model('Post', PostSchema);
