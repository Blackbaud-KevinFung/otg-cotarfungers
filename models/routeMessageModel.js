var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var routeMessageSchema = new Schema({
        fr_id:          String,
        message:        String,
	coordinates:		[]
});

module.exports = mongoose.model('routeMessageSchema', routeMessageSchema);
