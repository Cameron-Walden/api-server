'use strict';

module.exports = (request, response, next) => {
  let id = request.param.id;
  if(!id) {
    throw new Error('no id')
  }
  next();
}