const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
    type: DataTypes.ENUM,
    values: ['Entrée', 'Plat principal', 'Dessert', 'Sans catégorie'],
    allowNull: false,
    defaultValue: 'Sans catégorie',
  }
},
  {
    getterMethods: {
      url() {
        return "/cookbook/recipe/" + this.id;
      }
    }
  });

module.exports = Recipe;
