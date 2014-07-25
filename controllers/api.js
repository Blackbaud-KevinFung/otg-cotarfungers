var MapLayers = require('../models/mapLayersModel.js');
var UserLocation = require('../models/userLocationModel.js');
var RouteMessage = require('../models/routeMessageModel.js');
var request = require('request');

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

exports.getRouteMessagesByFrId = function(req, res) {
	console.log("get all routeMessages for an fr id: " + req.params.fr_id);
	RouteMessage.find({fr_id: req.params.fr_id},function(err, routeMessage) {
		if(!err) {
			console.log('Success!');
			console.log(routeMessage);
			res.status(200).send(routeMessage);
		} else {
			console.log("Error!!!");
			console.log(err);
		}
	});
}

exports.updateUserLocation = function(req, res) {
	console.log("Updating user location -----------------------");
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

exports.addRouteMessage = function(req, res) {
	console.log("adding route message for route");
	console.log(req.body);
	var routeMessage = new RouteMessage({
		fr_id: req.body.fr_id,
		message: req.body.message,
		coordinates: req.body.coordinates
	});

	routeMessage.save(function(err) {
		if(!err) {
			res.status(201).send('Save Succesful');
			console.log('Save Successful!');
		} else {
			console.log(err);
		}		
	});
}

exports.updateRouteMessage = function(req, res) {
	console.log("Updating routeMessage -----------------------");
	console.log(req.body);

	RouteMessage.update({ fr_id: req.body.fr_id, coordinates: req.body.coordinates }, { $set: { message: req.body.message }}).exec();

var MAX_DISTANCE = 0.5;
exports.sendNotif = function(req, res) {
    var lat = req.body.lat;
    var lon = req.body.lon;

    console.log("send notif for near markers: " + req.params);
    RouteMessage.find( {fr_id: req.params.fr_id}, function(err, locations) {
        if(!err) {
            for (i in locations) {
                var layer = locations[i];
                console.log(layer);
                var layerLat = layer['coordinates'][0];
                var layerLong = layer['coordinates'][1];

                if (pointsAreClose(lat, lon, layerLat, layerLong)) {
                    // send notification
                    var options = {
                        uri: "https://www.googleapis.com/mirror/v1/timeline",
                        method: "POST",
                        json: {
                            text: layer['message'],
                            notification: {
                               level: "DEFAULT" 
                            },
                        },
                        headers: {
                            "Authorization": "Bearer ya29.TQAyf4jqmDmnUhwAAABy_XCRvQ_0FjhcorEQDC_sg2ed3N1UV5cAT4enfDFuMQ"
                        }
                    };

                    console.log("about to send request...!");
                    request(options, function(error, response, body) {
                        console.log("error: " + error);
                    });
                } else {
                    console.log("aw");
                }
                res.status(201).send('Done searching');
            }
        } else {
            console.log("no layer found!");
            console.log(err);
        }
    });
}

function pointsAreClose(userLat, userLon, layerLat, layerLon) {
    var raduserLat = Math.PI * userLat/180
    var radlayerLat = Math.PI * layerLat/180
    var raduserLon = Math.PI * userLon/180
    var radlayerLon = Math.PI * layerLon/180
    var theta = userLon-layerLon
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(raduserLat) * Math.sin(radlayerLat) + Math.cos(raduserLat) * Math.cos(radlayerLat) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (dist < MAX_DISTANCE) {
        console.log("OH SNAP POINTS ARE CLOSE DAWG");
        return true
    } else {
        console.log("AW MAN POINTS ARE FAR");
        return false
    }
}
