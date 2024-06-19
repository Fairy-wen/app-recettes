const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://testuser:testpassword@localhost:5432/recipeapp'); // todo

module.exports = sequelize;
