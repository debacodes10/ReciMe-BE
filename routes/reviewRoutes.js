const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// GET /api/reviews - Get all reviews
router.get('/', reviewController.getAllReviews);

// GET /api/reviews/:recipeId - Get reviews for a specific recipe
router.get('/:recipeId', reviewController.getReviewsByRecipeId);

// POST /api/reviews - Create review stats for a recipe
router.post('/', reviewController.createReview);

// POST /api/reviews/:recipeId/add - Add a single review (increment counts)
router.post('/:recipeId/add', reviewController.addReview);

// PUT /api/reviews/:recipeId - Update review stats for a recipe
router.put('/:recipeId', reviewController.updateReview);

// DELETE /api/reviews/:recipeId - Delete review stats for a recipe
router.delete('/:recipeId', reviewController.deleteReview);

module.exports = router;
