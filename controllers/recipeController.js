const Recipe = require('../models/Recipe');

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    console.error('Error in getAllRecipes:', error);
    res.status(500).json({ message: 'Error fetching recipes', error: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error in getRecipeById:', error);
    res.status(500).json({ message: 'Error fetching recipe', error: error.message });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['recipe_name', 'recipe_description', 'recipe_procedure', 'recipe_image', 'ingredients', 'posted_by', 'cook_time'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        missingFields 
      });
    }

    // Validate character limits
    if (req.body.recipe_description.length > 200) {
      return res.status(400).json({
        message: 'recipe_description must not exceed 200 characters'
      });
    }

    if (req.body.recipe_procedure.length > 1200) {
      return res.status(400).json({
        message: 'recipe_procedure must not exceed 1200 characters'
      });
    }

    // Validate ingredients is an array
    if (!Array.isArray(req.body.ingredients)) {
      return res.status(400).json({ 
        message: 'ingredients must be an array' 
      });
    }

    // Validate cook_time is a positive number
    if (typeof req.body.cook_time !== 'number' || req.body.cook_time <= 0) {
      return res.status(400).json({
        message: 'cook_time must be a positive number'
      });
    }

    console.log('Creating recipe with data:', req.body);
    const recipeId = await Recipe.create(req.body);
    console.log('Recipe created with ID:', recipeId);
    res.status(201).json({ 
      message: 'Recipe created successfully', 
      recipeId 
    });
  } catch (error) {
    console.error('Error in createRecipe:', error);
    res.status(500).json({ message: 'Error creating recipe', error: error.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    // Validate character limits if fields are present
    if (req.body.recipe_description && req.body.recipe_description.length > 200) {
      return res.status(400).json({
        message: 'recipe_description must not exceed 200 characters'
      });
    }

    if (req.body.recipe_procedure && req.body.recipe_procedure.length > 1200) {
      return res.status(400).json({
        message: 'recipe_procedure must not exceed 1200 characters'
      });
    }

    // Validate ingredients if present
    if (req.body.ingredients !== undefined && !Array.isArray(req.body.ingredients)) {
      return res.status(400).json({ message: 'ingredients must be an array' });
    }

    // Validate cook_time if present
    if (req.body.cook_time !== undefined && (typeof req.body.cook_time !== 'number' || req.body.cook_time <= 0)) {
      return res.status(400).json({ message: 'cook_time must be a positive number' });
    }

    const success = await Recipe.update(req.params.id, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe updated successfully' });
  } catch (error) {
    console.error('Error in updateRecipe:', error);
    res.status(500).json({ message: 'Error updating recipe', error: error.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const success = await Recipe.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error in deleteRecipe:', error);
    res.status(500).json({ message: 'Error deleting recipe', error: error.message });
  }
};
