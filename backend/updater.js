var Options = require('./options')
var Log = require('./log')
var _ = require('lodash')
var fs = require('fs')
var Daemon = require('./daemon')

var initial_daemons = [];
try {
	initial_daemons = JSON.parse(fs.readFileSync('saved_daemons.json'))
	initial_daemons = initial_daemons.map((daemon) => {
		var created_daemon = new Daemon(daemon.multiaddr)
		created_daemon.id = daemon.id
		created_daemon.alive = daemon.alive
		created_daemon.tries = daemon.tries
		created_daemon.pinned = daemon.pinned
		//TODO find a way to restore pinning
		created_daemon.pinning = []
		created_daemon.to_pin = daemon.to_pin
		return created_daemon
	})
} catch(err) {
	if(err.code === 'ENOENT') {
		Log.info('### No saved deamons found! Starting from the beginning...')
		fs.writeFileSync('saved_daemons.json', JSON.stringify(initial_daemons))
	} else {
		throw err
	}
}

var Updater = {
	interval: null,
	daemons: initial_daemons,
	addDaemons: function(daemons) {
		this.daemons = this.daemons.concat(daemons)
		this.daemons = _.uniq(this.daemons, 'multiaddr');
		fs.writeFileSync('saved_daemons.json', JSON.stringify(this.daemons))
	},
	start: function() {
		this.interval = setInterval(() => {
			Log.info('Checking if daemons are alive')
			this.daemons.forEach((daemon) => {
				if(daemon.tries >= Options.daemon_alive_retries) {
					this.daemons = _.reject(this.daemons, (d) => {
						return d.multiaddr === daemon.multiaddr
					})
				}
				daemon.is_alive((alive, id) => {
					Log.info(daemon.id + ' is alive? ' + alive)
					daemon.alive = alive
					daemon.id = id
					if(alive) {
						daemon.tries = 0
						daemon.pin_unpinned_hashes()
					} else {
						daemon.tries = daemon.tries + 1
					}
					fs.writeFileSync('saved_daemons.json', JSON.stringify(this.daemons))
				})
			})
		}, Options.daemon_check_interval)
	},
	stop: function() {
		clearInterval(this.interval)
	}
}

module.exports = Updater
