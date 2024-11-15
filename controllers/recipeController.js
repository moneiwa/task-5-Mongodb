const Recipe = require('../models/recipeModel');

const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const recipe = new Recipe({
      title,description,ingredients,instructions
    });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipes = async (req, res) => {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const recipes = await Recipe.find()
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));

    const totalCount = await Recipe.countDocuments();
    res.status(200).json({
      recipes,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: ' not found' });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'not found' });
    }
    res.status(200).json({ message: ' successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, instructions } = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        ingredients,
        instructions,
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  deleteRecipe,
  updateRecipe
};
