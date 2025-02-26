const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// GET /api/categories - Get all categories
router.get('/', categoryController.getAllCategories);

// GET /api/categories/:recipeId - Get categories for a specific recipe
router.get('/:recipeId', categoryController.getCategoriesByRecipeId);

// POST /api/categories - Create categories for a recipe
router.post('/', categoryController.createCategories);

// PUT /api/categories/:recipeId - Update categories for a recipe
router.put('/:recipeId', categoryController.updateCategories);

// DELETE /api/categories/:recipeId - Delete categories for a recipe
router.delete('/:recipeId', categoryController.deleteCategories);

module.exports = router;
