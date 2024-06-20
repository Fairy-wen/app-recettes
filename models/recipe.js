const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// TODO: Est-ce qu'on met une contrainte d'unicité ?

const Recipe = sequelize.define('Recipe', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Recipe;
