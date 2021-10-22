'use strict';

module.exports = (request, response) => {
  console.log('404 error');
  response.status(404);
  response.end();
}