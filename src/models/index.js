'use strict';

require('dotenv').config();

//this connects us to the database
const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';
const { Sequelize, DataTypes } = require('sequelize');
const bookModel = require('./books.js');
const movieModel = require('./movies.js')

const options = process.env.NODE_ENV === 'production'
  ? {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
  }
  : {};


let sequelizeInstance = new Sequelize('sqlite:memory');
const bookTable = bookModel(sequelizeInstance, DataTypes);
const movieTable = movieModel(sequelizeInstance, DataTypes);

//https://sequelize.org/master/manual/assocs.html
//https://sequelize.org/master/class/lib/associations/has-many.js~HasMany.html
//https://sequelize.org/master/class/lib/associations/belongs-to.js~BelongsTo.html

// bookTable.hasMany(movieTable, { foreignKey: 'channelId', sourceKey: 'id'});
// movieTable.belongsTo(bookTable, {foreignKey: 'channelId', targetKey: 'id'});

module.exports = {
  db: sequelizeInstance,
  book: bookTable,
  movie: movieTable,
}