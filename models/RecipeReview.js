const db = require('../config/database');

class RecipeReview {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM recipe_reviews ORDER BY created_at DESC');
    return rows;
  }

  static async findByRecipeId(recipeId) {
    const [rows] = await db.query('SELECT * FROM recipe_reviews WHERE recipe_id = ?', [recipeId]);
    return rows[0];
  }

  static async create(reviewData) {
    const { recipe_id, total_reviews = 0, positive_reviews = 0, negative_reviews = 0 } = reviewData;

    const [result] = await db.query(
      'INSERT INTO recipe_reviews (recipe_id, total_reviews, positive_reviews, negative_reviews) VALUES (?, ?, ?, ?)',
      [recipe_id, total_reviews, positive_reviews, negative_reviews]
    );
    return result.insertId;
  }

  static async update(recipeId, reviewData) {
    const { total_reviews, positive_reviews, negative_reviews } = reviewData;

    const [result] = await db.query(
      'UPDATE recipe_reviews SET total_reviews = ?, positive_reviews = ?, negative_reviews = ? WHERE recipe_id = ?',
      [total_reviews, positive_reviews, negative_reviews, recipeId]
    );
    return result.affectedRows > 0;
  }

  static async incrementReviews(recipeId, isPositive) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Get current review counts
      const [rows] = await connection.query(
        'SELECT total_reviews, positive_reviews, negative_reviews FROM recipe_reviews WHERE recipe_id = ? FOR UPDATE',
        [recipeId]
      );

      if (rows.length === 0) {
        // Create new review record if it doesn't exist
        await connection.query(
          'INSERT INTO recipe_reviews (recipe_id, total_reviews, positive_reviews, negative_reviews) VALUES (?, 1, ?, ?)',
          [recipeId, isPositive ? 1 : 0, isPositive ? 0 : 1]
        );
      } else {
        // Update existing review record
        const current = rows[0];
        await connection.query(
          'UPDATE recipe_reviews SET total_reviews = total_reviews + 1, positive_reviews = positive_reviews + ?, negative_reviews = negative_reviews + ? WHERE recipe_id = ?',
          [isPositive ? 1 : 0, isPositive ? 0 : 1, recipeId]
        );
      }

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async delete(recipeId) {
    const [result] = await db.query('DELETE FROM recipe_reviews WHERE recipe_id = ?', [recipeId]);
    return result.affectedRows > 0;
  }
}

module.exports = RecipeReview;
