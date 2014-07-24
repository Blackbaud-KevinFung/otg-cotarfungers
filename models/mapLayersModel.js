var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var mapLayersSchema = new Schema({
	fr_id:          String,
	layer: 			Schema.Types.Mixed
});

module.exports = mongoose.model('MapLayers', mapLayersSchema);