'use strict';

const express = require('express');
const app = express();

app.use(express.json());

const notFoundErrorHandler = require('./error-handlers/404.js');
const unexpectedErrorHandler = require('./error-handlers/500.js');
const bookRoute = require('./routes/books.js');
const movieRoute = require('./routes/movies.js');
const apiRoute = require('./routes/api.js');

const logger = require('./middleware/logger.js')

app.get('/', (request, response) => {
  response.status(200).send('This is a test route');
});

app.use('/books', bookRoute);
app.use('/movies', movieRoute);
app.use('/api', apiRoute)

app.use('*', notFoundErrorHandler);
app.use(unexpectedErrorHandler);

app.use(logger);

module.exports = {
  server: app,
  start: (PORT) => {
    app.listen(PORT, () => {
      console.log(`Running on PORT ${PORT}`);
    });
  }
}