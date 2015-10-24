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
				Daemons.push(new_daemon)
				res.send(new_daemon)
			}
		},
		{
			method: 'get',
			path: '/daemons',
			func: (req, res) => {
				res.send(Updater.daemons)
			}
		},
		{
			method: 'post',
			path: '/pin/:hash',
			func: (req, res) => {
				const hash = req.params.hash
				Log.info('Gonna pin ' + hash + ' on all hosts')
				const alive_deamons = _.filter(Updater.daemons, (daemon) => {
					return daemon.alive
				})
				Log.info('Number of alive daemons to pin on: ' + alive_deamons.length)
				alive_deamons.forEach((daemon) => {
					daemon.to_pin = daemon.to_pin.concat([hash])
				})
				res.send(JSON.stringify(true))
			}
		}
	]
}
