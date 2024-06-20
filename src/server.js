const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const sequelize = require('../config/database');
const recipe = require('../models/recipe');

console.log("pouet");

const upload = multer();
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"index.html"));
});

app.get('/new-recipe', (req, res) => {
  res.render('form');
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/new-recipe', function(req, res){
  console.log(req.body);
  res.send("Merci ! Le backend n'est pas encore implémenté mais le formulaire fonctionne !");
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
