'use strict';

//defines a whole table and each column of the table

const Book = (sequelize, DataTypes) => sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Book;