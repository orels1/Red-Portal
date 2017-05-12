const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send({
    status: 'OK',
    results: 'api is alive',
  });

});

app.listen(3000, () => {
  console.info('Running on port 3000');
});

app.use(function onError(err, req, res, next) {
  res.status(500).send({
    status: 'ERROR',
    error: err.message,
    error_code: err.code || null,
  });
});