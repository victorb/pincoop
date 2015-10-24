var express = require('express');
var ipfsAPI = require('ipfs-api')
var bodyParser = require('body-parser')
var cors = require('cors')
var _ = require('underscore')
var winston = require('winston');

var log = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			colorize: true,
			timestamp: true
		})
	]
});

var app = express();
app.use(bodyParser.json({limit: '50mb'}))
app.use(cors());

var Options = {
	daemon_api_calls_timeout: 5000,
	daemon_alive_retries: 5,
	daemon_check_interval: 5000
}

var Daemon = function(multiaddr) {
	if(multiaddr === undefined) {
		throw new Error('You need to define a multiaddr!')
	}
	this.multiaddr = multiaddr
	this.ipfs = ipfsAPI(this.multiaddr)
	this.alive = false
	this.tries = 0
	this.pinned = []
	this.to_pin = []
}

Daemon.prototype = {
	pin_unpinned_hashes: function() {
		if(this.to_pin.length > 0) {
			console.log('I have some things to pin!')
			this.to_pin.forEach((hash_to_pin) => {
				this.ipfs.pin.add(hash_to_pin, (err, res) => {
					if(err !== null) throw err
					if(err === null && res.Pinned) {
						var pinned_hash = res.Pinned[0]
						var index_of_hash = this.to_pin.indexOf(pinned_hash)
						this.to_pin.splice(index_of_hash, 1)
						this.pinned.push(pinned_hash)
					}
				})
			})
		}
	},
	is_alive: function(callback) {
		//TODO TIMEOUT HACK AHEAD!
		//waiting for https://github.com/ipfs/node-ipfs-api/issues/71
		var interval = setTimeout(() => {
			this.alive = false
			this.tries++
			callback(this.alive)
		}, Options.daemon_api_calls_timeout)
		this.ipfs.id(function(err, res) {
			clearInterval(interval)
			if(err) {
				this.alive = false
				this.tries++
				callback(this.alive)
				return
			}
			if(res.ID !== undefined) {
				this.alive = true
				this.tries = 0
				callback(this.alive)
				return
			}
		})
	}
}
var test_daemon = new Daemon('/ip4/127.0.0.1/tcp/5001')
test_daemon.to_pin.push('QmXdMvJaRrSTCAcDFMZLUFfm9uGK6Wq7qEVcwbvaQRxq8x')
var Daemons = [test_daemon]

setInterval(() => {
	log.info('Checking if daemons are alive')
	Daemons.forEach((daemon) => {
		if(daemon.tries >= Options.daemon_alive_retries) {
			Daemons = _.reject(Daemons, (d) => {
				return d.multiaddr === daemon.multiaddr
			})
		}
		daemon.is_alive((alive) => {
			log.info(daemon.multiaddr + ' is alive? ' + alive)
			daemon.alive = alive
			if(alive) {
				daemon.tries = 0
				daemon.pin_unpinned_hashes()
			}
		})
	})
}, Options.daemon_check_interval)

app.post('/daemons', (req, res) => {
	const body = req.body
	var new_daemon = new Daemon(body.multiaddr)
	Daemons.push(new_daemon)
	res.send(new_daemon)
});

app.get('/daemons', (req, res) => {
	res.send(Daemons)
})

app.post('/pin/:hash', (req, res) => {
	const hash = req.params.hash
	log.info('Gonna pin ' + hash + ' on all hosts')
	const alive_deamons = _.filter(Daemons, (daemon) => {
		return daemon.alive
	})
	log.info('Number of alive daemons to pin on: ' + alive_deamons.length)
	alive_deamons.forEach((daemon) => {
		daemon.to_pin = daemon.to_pin.concat([hash])
	})
	res.send(JSON.stringify(true))
})

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;

  log.info('Example app listening at http://%s:%s', host, port);
});
