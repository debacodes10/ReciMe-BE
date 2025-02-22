const db = require('../config/database');

class Recipe {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM recipes');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM recipes WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(recipeData) {
    const { title, ingredients, instructions, cooking_time, servings } = recipeData;
    const [result] = await db.query(
      'INSERT INTO recipes (title, ingredients, instructions, cooking_time, servings) VALUES (?, ?, ?, ?, ?)',
      [title, ingredients, instructions, cooking_time, servings]
    );
    return result.insertId;
  }

  static async update(id, recipeData) {
    const { title, ingredients, instructions, cooking_time, servings } = recipeData;
    const [result] = await db.query(
      'UPDATE recipes SET title = ?, ingredients = ?, instructions = ?, cooking_time = ?, servings = ? WHERE id = ?',
      [title, ingredients, instructions, cooking_time, servings, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM recipes WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Recipe;
