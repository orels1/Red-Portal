var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var logger = require('morgan');

var app = express();

// App Middleware
app.set('port', process.env.PORT || 3500);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(express.static(path.join(__dirname, 'apidoc')));

var server = require('http').createServer(app);
server.listen(app.get('port'), function() {
    console.log('Documentation can be viewed on http://localhost:' + app.get('port'));
});

app.use(function(req, res) {
    res.status(200).sendFile('apidoc/index.html');
});
