var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var mapLayersSchema = new Schema({
	fr_id:          Number,
	layer: 			Schema.Types.Mixed
});

module.exports = mongoose.model('mapLayers', mapLayersSchema);