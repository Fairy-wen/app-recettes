const express = require('express');
const router = express.Router();
const recipe = require('../../models/recipe');
const path = require('path');
const app = express();


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

router.get('/', function(req, res){

    res.render('add_recipe', { title: "Ajouter une recette" });
});

router.post('/', function(req, res){

    console.debug('Got post request at route add_recipe');
    const recipeInfos = req.body; //Get the parsed information

    console.debug('Checking that all fields are fulfilled.');
    if(!recipeInfos.title 
    || !recipeInfos.ingredients 
    || !recipeInfos.instructions){
        //alert("Certains champs ne sont pas remplis");
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
            //alert("Erreur en base de donnée : %s", err);
            return
        }
    });

    res.redirect('../');

});

//export this router to use in our index.js
module.exports = router;