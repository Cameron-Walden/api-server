'use strict';

//defines a whole table and each column of the table

const Movie = (sequelize, DataTypes) => sequelize.define('Movie', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

module.exports = Movie;