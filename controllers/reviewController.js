const RecipeReview = require('../models/RecipeReview');

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await RecipeReview.findAll();
    res.json(reviews);
  } catch (error) {
    console.error('Error in getAllReviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

exports.getReviewsByRecipeId = async (req, res) => {
  try {
    const reviews = await RecipeReview.findByRecipeId(req.params.recipeId);
    if (!reviews) {
      return res.status(404).json({ message: 'Reviews not found for this recipe' });
    }
    res.json(reviews);
  } catch (error) {
    console.error('Error in getReviewsByRecipeId:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { recipe_id, total_reviews, positive_reviews, negative_reviews } = req.body;

    // Validate required fields
    if (!recipe_id) {
      return res.status(400).json({
        message: 'Missing required field: recipe_id'
      });
    }

    // Validate review counts
    if (total_reviews < 0 || positive_reviews < 0 || negative_reviews < 0) {
      return res.status(400).json({
        message: 'Review counts cannot be negative'
      });
    }

    if (total_reviews !== (positive_reviews + negative_reviews)) {
      return res.status(400).json({
        message: 'Total reviews must equal the sum of positive and negative reviews'
      });
    }

    const reviewId = await RecipeReview.create(req.body);
    res.status(201).json({
      message: 'Review created successfully',
      reviewId
    });
  } catch (error) {
    console.error('Error in createReview:', error);
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { total_reviews, positive_reviews, negative_reviews } = req.body;

    // Validate review counts if present
    if (total_reviews < 0 || positive_reviews < 0 || negative_reviews < 0) {
      return res.status(400).json({
        message: 'Review counts cannot be negative'
      });
    }

    if (total_reviews !== (positive_reviews + negative_reviews)) {
      return res.status(400).json({
        message: 'Total reviews must equal the sum of positive and negative reviews'
      });
    }

    const success = await RecipeReview.update(req.params.recipeId, req.body);
    if (!success) {
      return res.status(404).json({ message: 'Reviews not found for this recipe' });
    }
    res.json({ message: 'Reviews updated successfully' });
  } catch (error) {
    console.error('Error in updateReview:', error);
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { is_positive } = req.body;
    
    if (typeof is_positive !== 'boolean') {
      return res.status(400).json({
        message: 'is_positive must be a boolean value'
      });
    }

    await RecipeReview.incrementReviews(req.params.recipeId, is_positive);
    res.json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error in addReview:', error);
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const success = await RecipeReview.delete(req.params.recipeId);
    if (!success) {
      return res.status(404).json({ message: 'Reviews not found for this recipe' });
    }
    res.json({ message: 'Reviews deleted successfully' });
  } catch (error) {
    console.error('Error in deleteReview:', error);
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};
