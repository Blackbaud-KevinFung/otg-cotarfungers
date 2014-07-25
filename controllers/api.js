var MapLayers = require('../models/mapLayersModel.js');

exports.saveMapLayer = function(req, res) {
	console.log("Saving ");
	console.log(req.body);
	var mapLayer = new MapLayers({
		fr_id: req.body.fr_id,
		layer: req.body.layer
	});

	mapLayer.save(function(err) {
		if(!err) {
			res.status(201).send('Save Succesful');
			console.log('Save Successful!');
		} else {
			console.log(err);
		}		
	});
}

exports.getMapLayersByFrId = function(req, res) {
	console.log("get all map layers for an fr id: " + req.params.fr_id);
	MapLayers.find({fr_id: req.params.fr_id},function(err, mapLayers) {
		if(!err) {
			console.log('Success!');
			console.log(mapLayers);
			res.status(200).send(mapLayers);
		} else {
			console.log("Error!!!");
			console.log(err);
		}
	});
}


exports.updateUserLocation = function(req, res) {
	console.log("Saving ");
	console.log(req.body);

	UserLocation.update({ user_id: req.body.user_id }, { $set: { loc: req.body.loc }}).exec();
}

exports.getUserLocationByUserId = function(req, res) {
	console.log("get all map layers for an user id: " + req.params.user_id);
	UserLocation.find({user_id: req.params.user_id},function(err, userLoc) {
		if(!err) {
			console.log('Success!');
			console.log(userLoc);
			res.status(200).send(userLoc);
		} else {
			console.log("Error!!!");
			console.log(err);
		}
	});
}