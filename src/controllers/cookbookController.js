const { Sequelize } = require("sequelize");
const Recipe = require("../../models/recipe");
const asyncHandler = require("express-async-handler");
const { Op } = require("sequelize");

exports.index = asyncHandler(async (req, res, next) => {
    
    // Fetch data
    const [
        numRecipesWithCategory
        ,numRecipesWithoutCategory
        ,numCategories
    ] = await Promise.all([
        Recipe.count({
            where: { 
                [Op.not]: {category: 'Sans catégorie'}
                }
        })
        ,Recipe.count({
            where: { 
                category: 'Sans catégorie'
                }
        })
        , Recipe.count({
            distinct: true,
            col: 'category',
            where: { 
                [Op.not]: {category: 'Sans catégorie'}
                }
        })
        
    ]);

    // Render data
    res.render("index", {
        title: "Recettes disponibles"
        , recipe_count_with_category: numRecipesWithCategory
        , recipe_count_without_category: numRecipesWithoutCategory
        , category_count: numCategories
    });

});