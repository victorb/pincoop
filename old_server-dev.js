var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
		context: __dirname + '/frontend',
    hot: true,
		entry: 'index.js',
		//publicPath: path.join(__dirname, '/frontend'),
		historyApiFallback: true,
		contentBase: 'frontend',
    stats: {
        colors: true
    }
}).listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
