// Configuration de base
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const upload = multer();
const app = express();
const port = 3000;

const indexRouter = require("./routes/index");
const cookbookRouter = require('./routes/cookbook');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Configuration base de données
const sequelize = require('../config/database');
const Recipe = require("../models/recipe");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des routes
app.use('/cookbook', cookbookRouter);
app.use('/', indexRouter);


app.listen(port, async () => {
  console.info(`App running on http://localhost:${port}`);

  try {
    await sequelize.authenticate();
    console.debug('Connection to the database has been established successfully.');

    // Synchronize the models with the database
    await Recipe.sync({alter: true});
    console.debug('Database synchronized.');

    } catch (error) {
    console.error('Error while connecting or synchronizing database:', error);
  }
});
