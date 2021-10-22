'use strict';

module.exports = (request, response, next) => {
  console.log(`the method used was: ${request.method}, on path: ${request.path}`);
  next();
}