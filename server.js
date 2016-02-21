var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var app = express();

var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/chekmaark',
  cloud: __dirname + '/cloud/main.js', // Provide an absolute path
  appId: 'chekmaark-1508',
  masterKey: 'groufye-chekmaark-9051', //Add your master key here. Keep it secret!
  serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
});

app.use(express.static('public'));
// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

app.listen(1337, function() {
  console.log('Chekmaark server running on port 1337.');
});
