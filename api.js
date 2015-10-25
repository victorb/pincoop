var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

var Daemon = require('./backend/daemon')
var Log = require('./backend/log')
var Options = require('./backend/options')
var Updater = require('./backend/updater')
var Routes = require('./backend/routes')(Updater)

var app = express();
app.use(bodyParser.json())
app.use(cors());

var bootstrap = [
	'/ip4/127.0.0.1/tcp/5001',
	'/ip4/128.199.46.197/tcp/5001'
]

Updater.setDaemons(bootstrap.map((multiaddr) => {
	return new Daemon(multiaddr)
}))

Updater.start()

Routes.forEach((route) => {
	app[route.method]('/api' + route.path, route.func)
})

var server = app.listen(3001, () => {
  var host = server.address().address;
  var port = server.address().port;

  Log.info('Example app listening at http://%s:%s', host, port);
});
