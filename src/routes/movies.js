'use strict';

const express = require('express');

const { movie } = require('../models/index.js');

// const data = require('../models/index.js');
const router = express.Router();

router.get('/', getMovie);
router.get('/:id', getOneMovie);
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

async function getMovie(request, response) {
  const allMovieData = await movie.findAll();
  response.status(200).send(allMovieData);
}

async function getOneMovie(request, response) {
  const id = request.params.id
  const singleMovieData = await movie.findOne({
    where: {
      id: id
    }
  });
  response.status(200).send(singleMovieData);
}

async function createMovie(request, response) {
  const newMovie = await movie.create({
    title: request.body.title,
    genre: request.body.genre
  });
  response.status(200).send(newMovie)
}

async function updateMovie(request, response) {
  const id = request.params.id;
  const movieObject = request.body;
  const movieData = await movie.findOne({
    where: {
      id: id
    }
  });
  const updatedMovie = await movieData.update(movieObject);
  response.status(200).send(updatedMovie)
}

// async function updateMovie(request, response) {
//   const id = request.params.id;
//   const updatedMovie = await movie.update({
//     title: request.body.title,
//     genre: request.body.genre,
//   },{ where: {id: id}});
//   response.status(200).send(updatedMovie)
// }

async function deleteMovie(request, response) {
  const id = request.params.id;
  const deletedMovie= await movie.destroy({
    where: {
      id: id
    } 
  });
  response.status(200).send(deletedMovie)
}

module.exports = router;