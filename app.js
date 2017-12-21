var http = require('http');

var express = require('express'),
	bodyParser = require('body-parser'),
	oauthserver = require('oauth2-server');

var app = express();

var server = http.createServer(app);

server.listen(8090, function(err){
		console.log('Server is running on 8090');
})

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = oauthserver({
	model: require('./model.js'),
	grants: ['password', 'client_credentials'],
	debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
	res.send('Congratulations, you are in a secret area!');
});

app.use(app.oauth.errorHandler());
