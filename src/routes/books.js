'use strict';

const express = require('express');
const { book } = require('../models/index.js')

// const data = require('../models/index.js');
const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getOneBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

async function getBooks(request, response) {
  const allBookData = await book.findAll();
  response.status(200).send(allBookData);
}

// async function getOneBook(request, response) {
//   const id = request.params.id
//   const singleBookData = await book.findOne({
//     where: {
//       id: id
//     }
//   });
//   response.status(200).send(singleBookData);
// }

async function getOneBook(request, response) {
  try{
    const id = request.params.id;
    const foundBook = await book.findOne(id);
    response.status(200).send(foundBook);
  } catch (error){
    next(error);
  }
}

async function createBook(request, response, next) {
  const newBook = await book.create({
    title: request.body.title,
    author: request.body.author
  });
  response.status(200).send(newBook);
}

// async function updateBook(request, response) {
//   const id = request.params.id;
//   const bookObject = request.body;
//   const bookData = await book.findOne({
//     where: {
//       id: id
//     }
//   });
//   const updatedBook = await bookData.update(bookObject);
//   response.status(200).send(updatedBook)
// }

// async function updateBook(request, response) {
//   const id = request.params.id;
//   const bookToUpdate = await book.findByPk(id);
//   const updatedBook = await bookToUpdate.update({
//     title: request.body.title,
//     author: request.body.author,
//   });
//   response.status(200).send(updatedBook)
// }

async function updateBook(request, response) {
  const id = request.params.id;
  const bookToUpdate = await book.findByPk(id);
  const updatedBook = await bookToUpdate.update({
    title: request.body.title,
    author: request.body.author,
  });
  response.status(200).send(updatedBook)
}

// async function deleteBook(request, response) {
//   const id = request.params.id;
//   const deletedBook = await book.destroy({
//     where: {
//       id: id
//     } 
//   });
//   response.status(200).send(deletedBook)
// }

async function deleteBook(request, response) {
  const id = request.params.id;
  const bookDeleted = await book.destroy(id);
  response.status(200).send(bookDeleted);
}

module.exports = router;