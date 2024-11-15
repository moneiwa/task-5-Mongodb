const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

router.post('/', recipeController.createRecipe);
router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getRecipeById);
router.delete('/:id', recipeController.deleteRecipe);
router.put('/:id', recipeController.updateRecipe);

module.exports = router;
