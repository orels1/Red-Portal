const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to a db
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.mongoURL || 'localhost/redportal');

// Routes
app.use('/repos', require('./repos'));
app.use('/cogs', require('./cogs'));
app.use('/github', require('./github').router);

app.get('/', (req, res) => {
  res.status(200).send({
    status: 'OK',
    results: 'api is alive',
  });

});

app.listen(3000, () => {
  console.info('Running on port 3000');
});

app.use((err, req, res, next) => {
  switch (err.message) {
    case 'NotFound':
      return res.status(404).send({
        status: 'ERROR',
        error: err.message,
      });
    case 'DevEndpointCalledInProduction':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    case 'InfoJsonDecodeFailed':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    case 'ReadmeDecodeFailed':
      return res.status(400).send({
        status: 'ERROR',
        error: err.message,
      });
    default:
      return res.status(500).send({
        status: 'ERROR',
        error: err.message,
      });
  }
});