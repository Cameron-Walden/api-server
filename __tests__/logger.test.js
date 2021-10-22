'use strict';

const logger = require('../src/middleware/logger.js');

describe('Testing logger', () => {
  describe('When logger is called', () => {
    it('Passes on to the next function', () => {
      let request = {};
      let response = {};
      let next = jest.fn();

      logger(request, response, next);
      expect(next).toHaveBeenCalled();

    });
  });
});