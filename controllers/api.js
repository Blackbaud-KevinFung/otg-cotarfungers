var MapLayers = require('../models/mapLayersModel.js');

exports.saveMapLayer = function(req, res) {
	console.log("Saving map layer: ");
	console.log(req.body);
	console.log("req.body.layer: ");
	console.log(req.body.layer);
	console.log("req.body.layer.geometry: ");
	console.log(req.body.layer.geometry);
	console.log("req.body.layer.geometry.coordinates: ");
	console.log(req.body.layer.geometry.coordinates);

	var mapLayer = new MapLayers({
		fr_id: req.body.fr_id,
		layer: req.body.layer
	});

	mapLayer.save(function(err) {
		if(!err) {
			console.log("Save Successful!");
		} else {
			console.log(err);
		}		
	});

}
