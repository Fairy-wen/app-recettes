const express = require('express');
const router = express.Router();
const recipe = require('../../models/recipe');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

router.get('/', function(req, res){
    res.render('add_recipe');
});

router.post('/', function(req, res){

    console.debug('Got post request at route add_recipe');
    const recipeInfos = req.body; //Get the parsed information

    console.debug('Checking that all fields are fulfilled.');
    if(!recipeInfos.title 
    || !recipeInfos.ingredients 
    || !recipeInfos.instructions
    || !recipeInfos.category){
        res.render('show_message', {
        message: "Tous les champs doivent être remplis", type: "error"});
    return
    }
    
    console.debug('Creating database recipe object to save.');
    const newRecipe = new recipe({
        title: recipeInfos.title,
        ingredients: recipeInfos.ingredients,
        instructions: recipeInfos.instructions,
        category: recipeInfos.category
    });

    console.debug('Saving recipe %s',recipeInfos.title);
    newRecipe.save(function(err, Recipe){
        if(err) {
            res.render('show_message', {message: "Erreur en base de donnée", type: "error"});
            return
        }
    });

    res.render('show_message', {
        message: "La recette a bien été ajoutée", type: "success", Recipe: recipeInfos});

    //res.redirect('../');

});

//export this router to use in our index.js
module.exports = router;