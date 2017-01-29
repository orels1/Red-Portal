// babel compiler
require('babel-polyfill');
require('babel-register');

// paths
require('app-module-path').addPath(__dirname + '/');

var path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    express = require('express'),
    cors = require('cors');

var app = express();

// Sentry
var Raven = require('raven');
Raven.config(process.env.DSN).install();

/*
* App Middleware
* */
app.set('port', process.env.PORT || 3000);
app.set('trust proxy', process.env.NODE_ENV === 'production' || false);
app.use(Raven.requestHandler());
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

app.listen(app.get('port'));
console.log('Server is listening at port ' + app.get('port'));

/*
* Modules
* */
// var twitchapi = require('./backend/twitchapi');

/*
* API handlers
* */

// Main
var config = require('./backend/api/v1/config'),
    repos = require('./backend/api/v1/repos'),
    cogs = require('./backend/api/v1/cogs'),
    search = require('./backend/api/v1/search'),
    admin = require('./backend/api/v1/admin');

// Misc
var count = require('./backend/api/v1/misc/count');


/*
* CORS for API
* */
// List of accepted domains
var whitelist = ['http://localhost:4000', 'http://localhost:5000'];

// Custom matcher function
var corsOpts = {
    'origin': function(origin, cb) {
        var isWhitelisted = whitelist.indexOf(origin) !== -1;
        cb(isWhitelisted ? null : 'Bad Request', isWhitelisted);
    },
};

/*
* API access control*/

function apiAccessControl(req, res, next) {
    if (req.method !== 'GET' || req.baseUrl === '/api/v1/config') {
        if (req.get('Service-Token') === process.env.serviceToken) {
            next();
        } else {
            res.status(401).send({
                'error': 'Unauthorized',
                'error_details': 'Please provide correct Service-Token header',
                'results': {},
            });
        }
    } else {next();}
}

/*
* API (v1)
* */

// Main
app.use('/api/v1/config', cors(), apiAccessControl, config.router);
app.use('/api/v1/repos', cors(), apiAccessControl, repos.router);
app.use('/api/v1/cogs', cors(), apiAccessControl, cogs.router);
app.use('/api/v1/search', cors(), apiAccessControl, search.router);
app.use('/api/v1/admin', cors(), apiAccessControl, admin.router);

// Misc
app.use('/api/v1/misc/count', cors(), apiAccessControl, count.router);

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

// Error handler
if (process.env.NODE_ENV === 'production') {
    app.use(Raven.errorHandler());
}

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.

    if (process.env.NODE_ENV === 'dev') {
        console.log(err);
    }
    res.status(500).send({
        'error': 'DBError',
        'error_details': 'Could not get data from db, contact support and provide the error_id',
        'error_id': res.sentry,
        'results': {},
    });
});

// export server for the modules which needs it
module.exports = app;
