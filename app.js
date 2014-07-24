var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
};



mongoose.connect('mongodb://localhost/data/db');

server.listen(process.env.PORT || 3001);

app.configure(function(){
	app.set('port', process.env.PORT || 3001);
  app.use(express.bodyParser());
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(allowCrossDomain);
});

/*
 * REST API methods --shouldn't be too many--
 */
 
var api = require('./controllers/api.js');
// just a test function to show node is working
// serves up a page with some socket.io comm
app.get('/', function(req, res){
    res.sendfile(__dirname + '/static/index.html');
});

app.post('/api/saveMapLayer', api.saveMapLayer);



