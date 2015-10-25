var Daemon = require('./daemon')
var Log = require('./log')
var _ = require('underscore')

module.exports = function(Updater) {
	return [
		{
			method: 'post',
			path: '/daemons',
			func: (req, res) => {
				const body = req.body
				var new_daemon = new Daemon(body.multiaddr)
				Updater.daemons.push(new_daemon)
				// TODO send back id?
				res.send(new_daemon)
			}
		},
		{
			method: 'get',
			path: '/daemons',
			func: (req, res) => {
				const daemons = Updater.daemons.map((daemon) => {
					return daemon
				})
				res.send(Updater.daemons)
			}
		},
		{
			method: 'post',
			path: '/pin/:hash',
			func: (req, res) => {
				const hash = req.params.hash
				Log.info('Gonna pin ' + hash + ' on all hosts')
				Log.info('Number of daemons to pin on: ' + Updater.daemons.length)
				Updater.daemons = Updater.daemons.map((daemon) => {
					if(daemon.pinned.indexOf(hash) === -1) {
						daemon.to_pin = _.uniq(daemon.to_pin.concat([hash]))
						daemon.pinned = _.uniq(daemon.pinned)
					}
					return daemon;
				})
				res.send(JSON.stringify(true))
			}
		}
	]
}
