'use strict';

const { db } = require('../src/models/index.js');
const supertest = require('supertest');
const server = require('../src/server.js');
const { expect } = require('@jest/globals');

const request = supertest(server.server);

beforeAll( async () => {
  await db.sync();
});
 
afterAll(async () => {
  await db.drop();
});

describe('Testing our express server', () => {

  // 404 on a bad route
  it('should give a 404 on a bad route ', async () => {
    const response = await request.get('/badroute');
    expect(response.status).toBe(404);
  });

  // 404 on a bad method
  it('should give a 404 on a bad method', async () => {
    const response = await request.patch('/books');
    expect(response.status).toBe(404);
  });
  
  //The correct status codes and returned data for each REST route(movie/book)
  it('should respond with a 200 for GET /movies', async () => {
    const response = await request.get('/movies');
    expect(response.status).toBe(200);
  });


  it('should respond with a 200 for GET /books', async () => {
    const response = await request.get('/books');
    expect(response.status).toBe(200);
  });
  
  // Create a record using POST(both movie and book)
  it('should respond with a 200 for POST /movies', async () => {
    const response = await request.post('/movies').send({
      title: 'A Nightmare on Elm Street',
      genre: 'horror',
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('A Nightmare on Elm Street')
  });

  it('should respond with a 200 for POST on /books', async () => {
    const response = await request.post('/books').send({
      title: 'From Hell',
      author: 'Alan Moore',
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('From Hell')
  });
  
  // Read a list of records using GET
  it('should respond with a 200 for GET /movies/:id', async () => {
    const response = await request.get('/movies/:id');
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('A Nightmare on Elm Street')
  });

  it('should respond with a 200 for GET on /books/:id', async () => {
    const response = await request.get('/books/:id');
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('From Hell');
  });

  // Update a record using PUT
  it('should respond with a 200 for PUT on /movies/:id', async () => {
    const response = await request.put('/movies/:id').send({
      title: 'updating',
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('updating')
  });

  it('should respond with a 200 for PUT on /books/:id', async () => {
    const response = await request.put('/books/:id').send({
      title: 'updating'
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('updating')
  });

  // Destroy a record using DELETE
  it('should respond with a 200 for DELETE on /movies/:id', async () => {
    const response = await request.put('/movies/:id');
    expect(response.status).toBe(200);
  });

  it('should respond with a 200 for DELETE on /books/:id', async () => {
    const response = await request.put('/books/:id');
    expect(response.status).toBe(200);
  });
});