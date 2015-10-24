var express = require('express');
var ipfsAPI = require('ipfs-api')



var app = express();

var Daemon = function(multiaddr) {
	if(multiaddr === undefined) {
		throw new Error('You need to define a multiaddr!')
	}
	this.multiaddr = multiaddr
	this.ipfs = ipfsAPI(this.multiaddr)
	this.alive = false
}

Daemon.prototype = {
	is_alive: function(callback) {
		this.ipfs.id(function(err, res) {
			if(err) {
				this.alive = false
				callback(this.alive)
				return
			}
			if(res.ID !== undefined) {
				this.alive = true
				callback(this.alive)
			}
		})
	}
}

var Deamons = []

var new_daemon = new Daemon('/ip4/127.0.0.1/tcp/5001')

new_daemon.is_alive(function(alive) {
	console.log('Is this daemon working?')
		console.log(alive)
})


//app.get('/', function (req, res) {
//  res.send('Hello World!');
//});
//
//var server = app.listen(3000, function () {
//  var host = server.address().address;
//  var port = server.address().port;
//
//  console.log('Example app listening at http://%s:%s', host, port);
//});
