var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var userLocationSchema = new Schema({
	user_id:          String,
	loc: 			Schema.Types.Mixed
});

module.exports = mongoose.model('UserLocation', userLocationSchema);