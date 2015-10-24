var express = require('express');
var app = express();

app.use(express.static(__dirname));

var port = process.env.PORT || 9000;

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
