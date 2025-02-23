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
    const requiredFields = ['recipe_name', 'recipe_description', 'recipe_images', 'ingredients', 'posted_by'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        missingFields 
      });
    }

    // Validate arrays
    if (!Array.isArray(req.body.recipe_images) || !Array.isArray(req.body.ingredients)) {
      return res.status(400).json({ 
        message: 'recipe_images and ingredients must be arrays' 
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
    // Validate required fields if they are present in the update
    const fields = ['recipe_name', 'recipe_description', 'recipe_images', 'ingredients', 'posted_by'];
    const updateFields = fields.filter(field => req.body[field] !== undefined);
    
    // Validate arrays if they are being updated
    if (req.body.recipe_images && !Array.isArray(req.body.recipe_images)) {
      return res.status(400).json({ message: 'recipe_images must be an array' });
    }
    if (req.body.ingredients && !Array.isArray(req.body.ingredients)) {
      return res.status(400).json({ message: 'ingredients must be an array' });
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
