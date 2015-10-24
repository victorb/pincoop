var Options = require('./options')
var Log = require('./log')

var Updater = {
	interval: null,
	daemons: [],
	setDaemons: function(daemons) {
		this.daemons = daemons
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
				daemon.is_alive((alive) => {
					Log.info(daemon.multiaddr + ' is alive? ' + alive)
					daemon.alive = alive
					if(alive) {
						daemon.tries = 0
						daemon.pin_unpinned_hashes()
					}
				})
			})
		}, Options.daemon_check_interval)
	},
	stop: function() {
		clearInterval(this.interval)
	}
}

module.exports = Updater
