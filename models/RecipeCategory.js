const db = require('../config/database');

class RecipeCategory {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM recipe_categories ORDER BY created_at DESC');
    return rows;
  }

  static async findByRecipeId(recipeId) {
    const [rows] = await db.query('SELECT * FROM recipe_categories WHERE recipe_id = ?', [recipeId]);
    return rows[0];
  }

  static async create(categoryData) {
    const { recipe_id, categories } = categoryData;
    
    // Convert categories to JSON string if it isn't already
    const categoriesJson = Array.isArray(categories) ? JSON.stringify(categories) : categories;

    const [result] = await db.query(
      'INSERT INTO recipe_categories (recipe_id, categories) VALUES (?, ?)',
      [recipe_id, categoriesJson]
    );
    return result.insertId;
  }

  static async update(recipeId, categoryData) {
    const { categories } = categoryData;
    
    // Convert categories to JSON string if it isn't already
    const categoriesJson = Array.isArray(categories) ? JSON.stringify(categories) : categories;

    const [result] = await db.query(
      'UPDATE recipe_categories SET categories = ? WHERE recipe_id = ?',
      [categoriesJson, recipeId]
    );
    return result.affectedRows > 0;
  }

  static async delete(recipeId) {
    const [result] = await db.query('DELETE FROM recipe_categories WHERE recipe_id = ?', [recipeId]);
    return result.affectedRows > 0;
  }
}

module.exports = RecipeCategory;
