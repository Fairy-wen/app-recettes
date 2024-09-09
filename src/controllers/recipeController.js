const Recipe = require('../../models/recipe');

// const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");


exports.recipe_create_get = function(req, res){
    res.render('recipe_form', { title: "Ajouter une recette" });
};

exports.recipe_create_post = function(req, res){
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
    const newRecipe = new Recipe({
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

    res.redirect('/');
};

exports.recipe_details =  asyncHandler(async (req, res, next) => {
    console.debug("displaying details for recipe " + req.params.id);

    const detailedRecipe = await Recipe.findByPk(req.params.id);

    if (detailedRecipe === null) {
        console.error("Recipe not found");
        const err = new Error("Recipe not found");
        err.status = 404;
        return next(err);
    }


    console.debug("details de la recette", detailedRecipe.ingredients, detailedRecipe.instructions);

    res.render('recipe_detail', { 
        title: detailedRecipe.title, 
        recipe: detailedRecipe
    });
});