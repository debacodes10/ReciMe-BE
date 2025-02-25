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
      recipe_procedure,
      recipe_image,
      ingredients,
      posted_by,
      special_notes,
      cook_time
    } = recipeData;

    // Convert ingredients to JSON string if it isn't already
    const ingredientsJson = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;

    const [result] = await db.query(
      'INSERT INTO recipes (recipe_name, recipe_description, recipe_procedure, recipe_image, ingredients, posted_by, special_notes, cook_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [recipe_name, recipe_description, recipe_procedure, recipe_image, ingredientsJson, posted_by, special_notes, cook_time]
    );
    return result.insertId;
  }

  static async update(id, recipeData) {
    const {
      recipe_name,
      recipe_description,
      recipe_procedure,
      recipe_image,
      ingredients,
      posted_by,
      special_notes,
      cook_time
    } = recipeData;

    // Convert ingredients to JSON string if it isn't already
    const ingredientsJson = Array.isArray(ingredients) ? JSON.stringify(ingredients) : ingredients;

    const [result] = await db.query(
      'UPDATE recipes SET recipe_name = ?, recipe_description = ?, recipe_procedure = ?, recipe_image = ?, ingredients = ?, posted_by = ?, special_notes = ?, cook_time = ? WHERE id = ?',
      [recipe_name, recipe_description, recipe_procedure, recipe_image, ingredientsJson, posted_by, special_notes, cook_time, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM recipes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Recipe;
