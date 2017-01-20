// babel compiler
require("babel-polyfill");
require('babel-register');

// paths
require('app-module-path').addPath(__dirname + '/');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');
var swig = require('swig');
var cors = require('cors');
var session = require('express-session');

var app = express();

/*
* App Middleware
* */
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(express.static(path.join(__dirname, 'public')));

/*
* DB
* */
var mongoose = require('mongoose');
// Set promise library
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.mlabUrl || 'localhost/redportal');

mongoose.connection.on('error', function() {
    console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

var server = require('http').createServer(app);
server.listen(app.get('port'), function() {
    console.log('Red-Portal is available at http://localhost:' + app.get('port'));
});

// export server for the modules which needs it
module.exports = server;

/*
* Modules
* */
//var twitchapi = require('./backend/twitchapi');

/*
* API handlers
* */
var config = require('./backend/api/v1/config');
var repo = require('./backend/api/v1/repo');
var cogs = require('./backend/api/v1/cogs');
var auth = require('./backend/api/v1/auth');
var hooks = require('./backend/api/v1/hooks');
var users = require('./backend/api/v1/users');

/*
* Passport
* */
app.use(session({ secret: 'red is bae', resave: false, saveUninitialized: false }));
app.use(auth.passport.initialize());
app.use(auth.passport.session());

/*
* CORS for API
* */
// List of accepted domains
var whitelist = ['http://localhost:4000', 'http://localhost:5000'];

// Custom matcher function
var corsOpts = {
    origin: function(origin, cb) {
        var isWhitelisted = whitelist.indexOf(origin) !== -1;
        cb(isWhitelisted ? null : 'Bad Request', isWhitelisted);
    },
};

/*
* API access control*/

var apiAccessControl = function(restricted, cors, req, res, next) {
    if (
        (req.method != 'GET' || restricted)
        &&
        (req.method != 'POST' && !cors)
    ) {
        if (req.get('Service-Token') == process.env.serviceToken) {
            next();
        } else {
            res.status(401).send({
                'error': 'Unauthorized',
                'error_details': 'Please provide correct Service-Token header',
                'results': {}
            })
        }
    } else {next();}
};

/*
* API (v1)
* */
app.use('/api/v1/config',
    cors(),
    function(req, res, next) {apiAccessControl(true, false, req, res, next)},
    config.router);

app.use('/api/v1/repo',
    cors(),
    function(req, res, next) {apiAccessControl(false, false, req, res, next)},
    repo.router);

app.use('/api/v1/cogs',
    cors(),
    function(req, res, next) {apiAccessControl(false, false, req, res, next)},
    cogs.router);

app.use('/api/v1/auth',
    cors(),
    auth.router);

app.use('/api/v1/hooks',
    cors(),
    function(req, res, next) {apiAccessControl(true, true, req, res, next)},
    hooks.router);

app.use('/api/v1/users',
    cors(),
    function(req, res, next) {apiAccessControl(true, false, req, res, next)},
    users.router);


/*
* Frontend
* */
var swig  = require('swig'),
    React = require('react'),
    ReactDOM = require('react-dom/server'),
    Router = require('react-router'),
    routes = require('frontend/app/routes'),
    DocumentMeta = require('react-document-meta');

/*
* React Middleware
* */
app.use(function(req, res) {
    Router.match({ 'routes': routes.default, 'location': req.url }, function(err, redirectLocation, renderProps) {
        if (err) {
            res.status(500).send(err.message);
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
            var head = DocumentMeta.renderAsHTML();
            var page = swig.renderFile('frontend/views/index.html', { 'html': html, 'head': head });
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found');
        }
    });
});
