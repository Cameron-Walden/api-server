'use strict';

const express = require('express');
const router = express.Router();

const { books, movies } = require('../models');

const Collection = require('../models/collection-class.js');

const modelMap = {
  books: new Collection(books),
  movies: new Collection(movies),
};

router.use('/:model', function(request, response, next) {
  const model = modelMap[request.params.model];

  if(!model) {
    next('wah wah no model');
  }

  request.model = model;
  console.log(model);
  next();
});

router.get('/:model', async(request, response) => {
  const model = request.model;
  let records = await model.read;
  response.send(records);
});

router.get('/:model/:id', async(request, response) => {
  const model = request.model;
  const id = request.params.id;
  let singleRecord = await model.read(id);
  response.send(singleRecord);
});

router.post('/:model', async(request, response) => {
  const model = request.model;
  const json = request.body;
  let newRecord = await model.create(json);
  response.send(newRecord);
});

module.exports = router;