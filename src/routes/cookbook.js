const express = require('express');
const router = express.Router();
const recipe_controller = require("../controllers/recipeController");
const cookbook_controller = require("../controllers/cookbookController");

// ROOT

router.get('/', cookbook_controller.index);

// RECIPE ROUTES //

router.get('/recipe/add',recipe_controller.recipe_create_get);

router.post('/recipe/add', recipe_controller.recipe_create_post);

//export this router to use in our index.js
module.exports = router;