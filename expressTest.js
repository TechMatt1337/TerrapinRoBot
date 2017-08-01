const express = require('express');
const app = express();
const AlexaAppServer = require('alexa-app-server');
var server = new AlexaAppServer({port:3000});

server.start({

  // In order to start the server from a working directory other than
  // where your server.js file, you need to provide Node the full path
  // to your server's root directory. The easiest way is to use __dirname.
  // Default is '.'.
  server_root: __dirname,

  // A directory containing static content to serve as the document root.
  // This directory is relative to the script using alexa-app-server, not
  // relative to the module directory. Default is 'public_html'.
  public_html: "public_html",

  // A directory containing Alexa Apps. This directory should contain one
  // or more subdirectories. Each subdirectory is a stand-alone Alexa App
  // built with the alexa-app framework. These directories are each
  // processed during server startup and hooked into the server.
  app_dir: "apps",

  // The prefix to use for all Alexa Apps. For example, you may want all
  // your Alexa endpoints to be accessed under the "/api/" path off the
  // root of your web server. Default is 'alexa'.
  // Default is '.'.
  app_root: "alexa",

  // The directory containing server-side processing modules. Default is 'server'.
  server_dir: "server",

  // Enable http support, default is true.
  httpEnabled: true,

  // The port the server should bind to. Defaults to 8080.
  port: 3000,

  // The host address in which the server should bind to.
  // By default, the host is omitted and the server will accept connections on
  // any IPv6 address (::) when IPv6 is available, or any IPv4 address (0.0.0.0) otherwise.
  host: '127.0.0.1',

  // Show debugger UI with GET requests to Alexa App endpoints. Default is 'true'.
  // Note that the 'verify' and 'debug' options cannot be used together.
  debug: true,

  // Log useful information with console.log(). Default is true.
  log: true,

  // Insert alexa-verifier-middleware and add verification for Alexa requests
  // as required by the Alexa certification process. Default is 'false'.
  verify: false,

  // The pre() method is called after the express server has been instantiated, but
  // before any Alexa Apps have been loaded. It is passed the AlexaAppServer object itself.
  pre: function(appServer) { },

  // The post() method is called after the server has started and the start() method
  // is ready to exit. It's passed the AlexaAppServer object itself.
  post: function(appServer) { },

  // Like pre(), but this function is fired on every request, but before the
  // application itself gets called. You can use this to load up user details before
  // every request, for example, and insert it into the json request itself for
  // the application to use.
  // If it returns a falsy value, the request json is not changed.
  // If it returns a non-falsy value, the request json is replaced with what was returned.
  // If it returns a Promise, request processing pauses until the Promise resolves.
  // The value passed on by the promise (if any) replaces the request json.
  preRequest: function(json, request, response) { },

  // Like post(), but this function is fired after every request. It has a final
  // opportunity to modify the JSON response before it is returned back to the
  // Alexa service.
  // If it returns a falsy value, the response json is not changed.
  // If it returns a non-falsy value, the response json is replaced with what was returned.
  // If it returns a Promise, response processing pauses until the Promise resolves.
  // The value passed on by the promise (if any) replaces the response json.
  postRequest : function(json, request, response) { },

  // Enable https support. Note httpsPort, privateKey, and certificate are required.
  // Default is 'false'.
  // httpsEnabled: true,

  // The https port the server will bind to. Required for httpsEnabled support.
  // Default is undefined.
  // httpsPort: 443,

  // The private key filename. This file must reside in the sslcert folder under the
  // root of the project. Default is undefined.
  // privateKey: 'private-key.pem',

  // The certificate filename. This file must reside in the sslcert folder under the root of the
  // project. Default is undefined.
  // certificate: 'cert.cer',

  // The certificate chain bundle filename. This is an optional file that must reside in the
  // sslcert folder under the root of the project. Default is undefined.
  // chain: 'cert.ca_bundle',

  // An optional passphrase used to validate certificate and key files. For best practice, don't
  // put the password directly in your source code, especially if it's going to be on GitHub, and
  // instead, load it from process.env or a file included in the .gitignore list. Default is
  // undefined.
  // passphrase: 'passphrase'

});
server.express.use('/alexa/', function (req, res) {
	res.send("OKAY");
})

app.get('/', function (req, res) {
	res.send('Hello World!');
})

app.get('/jsonTest/', function (req, res) {
	var sampleData = {
		"version": "1.0",
		"response": {
			"outputSpeech": {
				"type": "PlainText",
				"text": "I'm not sure what your favorite color is. You can say, my favorite color is red."
			},
			"card": {
				"content": "SessionSpeechlet - I'm not sure what your favorite color is. You can say, my favorite color is red.",
				"title": "SessionSpeechlet - WhatsMyColorIntent",
				"type": "Simple"
			},
			"reprompt": {
				"outputSpeech": {
					"type": "PlainText"
				}
			},
			"speechletResponse": {
				"outputSpeech": {
					"text": "I'm not sure what your favorite color is. You can say, my favorite color is red."
				},
				"card": {
					"title": "SessionSpeechlet - WhatsMyColorIntent",
					"content": "SessionSpeechlet - I'm not sure what your favorite color is. You can say, my favorite color is red."
				},
				"reprompt": {
					"outputSpeech": {}
				},
				"shouldEndSession": false
			}
		},
  		"sessionAttributes": {}
	}
	res.send(sampleData);
})

app.listen(8080, function() {
	console.log('Example app listening on port 8080!');
})
