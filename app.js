var express = require('express');
var https = require('https');
var fs = require('fs');

var options = {
  	key: fs.readFileSync('server-key.pem'),
	cert: fs.readFileSync('server-cert.pem')
};

app = express()

app.get('/', function(req,res) {
    res.send('hello');
});

var server = https.createServer(options, app);

server.listen(443, function(){
    console.log("server running at https://IP_ADDRESS:yeah/")
});