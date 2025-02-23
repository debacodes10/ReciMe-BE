const db = require('../config/database');

class Recipe {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM recipes ORDER BY created_at DESC');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(recipeData) {
    const {
      recipe_name,
      recipe_description,
      recipe_images,
      ingredients,
      posted_by,
      special_notes
    } = recipeData;

    // Convert arrays to JSON strings if they aren't already
    const imagesJson = Array.isArray(recipe_images) ? JSON.stringify(recipe_images) : recipe_images;
    const ingredientsJson = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;

    const [result] = await db.query(
      'INSERT INTO recipes (recipe_name, recipe_description, recipe_images, ingredients, posted_by, special_notes) VALUES (?, ?, ?, ?, ?, ?)',
      [recipe_name, recipe_description, imagesJson, ingredientsJson, posted_by, special_notes]
    );
    return result.insertId;
  }

  static async update(id, recipeData) {
    const {
      recipe_name,
      recipe_description,
      recipe_images,
      ingredients,
      posted_by,
      special_notes
    } = recipeData;

    // Convert arrays to JSON strings if they aren't already
    const imagesJson = Array.isArray(recipe_images) ? JSON.stringify(recipe_images) : recipe_images;
    const ingredientsJson = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;

    const [result] = await db.query(
      'UPDATE recipes SET recipe_name = ?, recipe_description = ?, recipe_images = ?, ingredients = ?, posted_by = ?, special_notes = ? WHERE id = ?',
      [recipe_name, recipe_description, imagesJson, ingredientsJson, posted_by, special_notes, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM recipes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Recipe;
