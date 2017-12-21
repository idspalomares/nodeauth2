var http = require('http');

var express = require('express'),
	bodyParser = require('body-parser'),
	oauthserver = require('oauth2-server');

app = express();

var server = http.createServer(app);



app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var sample = require('./routes/sample.js');

app.oauth = oauthserver({
	model: require('./model.js'),
	grants: ['password', 'client_credentials'],
	debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
	res.send('Congratulations, you are in a secret area!');
});

app.use('/sample', sample);

app.use(app.oauth.errorHandler());

server.listen(8090, function(err){
		console.log('Server is running on 8090');
});