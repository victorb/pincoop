var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
var proxy = require('express-http-proxy');

var Daemon = require('./backend/daemon')
var Log = require('./backend/log')
var Options = require('./backend/options')
var Updater = require('./backend/updater')
var Routes = require('./backend/routes')(Updater)

var app = express();
app.use(bodyParser.json())
app.use(cors());
if(process.env.STATIC) {
	Log.info('Servering static content from frontend/dist')
	app.use(express.static('frontend/dist'))
}

if(!process.env.DEV) {
	app.use(function (req, res, next) {
			var originalUrl = req.originalUrl
			if (originalUrl.indexOf('/api/') !== -1) {
				return next();
			}
			res.sendFile(__dirname + '/frontend/dist/index.html');
	})
} else {
	app.use('/', proxy('http://localhost:3001', {
		forwardPath: function(req, res) {
			return require('url').parse(req.url).path;
		}
	}));
}

var bootstrap = [
	'/ip4/127.0.0.1/tcp/5001',
	'/ip4/128.199.46.197/tcp/5001'
]

Updater.addDaemons(bootstrap.map((multiaddr) => {
	return new Daemon(multiaddr)
}))

Updater.start()

Routes.forEach((route) => {
	app[route.method]('/api' + route.path, route.func)
})


const PORT = process.env.PORT || 3000
var server = app.listen(PORT, () => {
  var host = server.address().address;
  var port = server.address().port;

  Log.info('Example app listening at http://%s:%s', host, port);
});
