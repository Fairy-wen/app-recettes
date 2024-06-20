const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://testuser:testpassword@db:5432/recipeapp');

module.exports = sequelize;
