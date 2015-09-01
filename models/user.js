/*
 * POST MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    created_at  : { type: Date }
  , updated_at  : { type: Date }
  , email: String
  , passwordDigest: String
});

// BEFORE/AFTER FILTER
UserSchema.pre('save', function (next) {
  // SET CREATED_AT AND UPDATED_AT
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }

  next();
});

// EXPORT POST MODEL
mongoose.model('User', UserSchema);
