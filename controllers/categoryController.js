const RecipeCategory = require('../models/RecipeCategory');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await RecipeCategory.findAll();
    res.json(categories);
  } catch (error) {
    console.error('Error in getAllCategories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

exports.getCategoriesByRecipeId = async (req, res) => {
  try {
    const categories = await RecipeCategory.findByRecipeId(req.params.recipeId);
    if (!categories) {
      return res.status(404).json({ message: 'Categories not found for this recipe' });
    }
    res.json(categories);
  } catch (error) {
    console.error('Error in getCategoriesByRecipeId:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
};

exports.createCategories = async (req, res) => {
  try {
    const { recipe_id, categories } = req.body;

    // Validate required fields
    if (!recipe_id || !categories) {
      return res.status(400).json({
        message: 'Missing required fields: recipe_id and categories are required'
      });
    }

    // Validate categories is an array
    if (!Array.isArray(categories)) {
      return res.status(400).json({
        message: 'categories must be an array of strings'
      });
    }

    // Validate all elements are strings
    if (!categories.every(cat => typeof cat === 'string')) {
      return res.status(400).json({
        message: 'All categories must be strings'
      });
    }

    const categoryId = await RecipeCategory.create(req.body);
    res.status(201).json({
      message: 'Categories created successfully',
      categoryId
    });
  } catch (error) {
    console.error('Error in createCategories:', error);
    res.status(500).json({ message: 'Error creating categories', error: error.message });
  }
};

exports.updateCategories = async (req, res) => {
  try {
    const { categories } = req.body;

    // Validate categories if present
    if (!Array.isArray(categories)) {
      return res.status(400).json({
        message: 'categories must be an array of strings'
      });
    }

    // Validate all elements are strings
    if (!categories.every(cat => typeof cat === 'string')) {
      return res.status(400).json({
        message: 'All categories must be strings'
      });
    }

    const success = await RecipeCategory.update(req.params.recipeId, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Categories not found for this recipe' });
    }
    res.json({ message: 'Categories updated successfully' });
  } catch (error) {
    console.error('Error in updateCategories:', error);
    res.status(500).json({ message: 'Error updating categories', error: error.message });
  }
};

exports.deleteCategories = async (req, res) => {
  try {
    const success = await RecipeCategory.delete(req.params.recipeId);
    if (!success) {
      return res.status(404).json({ message: 'Categories not found for this recipe' });
    }
    res.json({ message: 'Categories deleted successfully' });
  } catch (error) {
    console.error('Error in deleteCategories:', error);
    res.status(500).json({ message: 'Error deleting categories', error: error.message });
  }
};
