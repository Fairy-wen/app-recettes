// Configuration de base
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const upload = multer();
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Configuration base de données
const sequelize = require('../config/database');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des routes
const addRecipeRouter = require('./routes/add_recipe');
app.use('/add_recipe', addRecipeRouter);

app.get('/', (req, res) => {
  res.render('index', { title: "La recette des cookies" });
});

app.listen(port, async () => {
  console.info(`App running on http://localhost:${port}`);

  try {
    await sequelize.authenticate();
    console.debug('Connection to the database has been established successfully.');

    // Synchronize the models with the database
    await sequelize.sync({ force: false }); // { force: true } will drop the table if it already exists
    console.debug('Database synchronized.');

    /* Optionally, create some initial data
    await recipe.create({
      title: 'Mortellous Chocolate Chips Cookies', // original receipe https://cakesinthecity.blogspot.com/2008/08/mortellous-chocolate-cookies.html?m=1
      ingredients: 'Chocolate, Flour, Sugar, Eggs, Butter, Chocolate Chips',
      instructions: 'Mix ingredients, bake at 160°C (320°F) for 10 minutes.',
      category: 'dessert'
    });

    console.debug('Initial data created.');
    */

    } catch (error) {
    console.error('Error while connecting or synchronizing database:', error);
  }
});
