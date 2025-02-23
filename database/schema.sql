CREATE DATABASE IF NOT EXISTS recipe_db;
USE recipe_db;

CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_name VARCHAR(255) NOT NULL,
  recipe_description TEXT NOT NULL,
  recipe_images JSON NOT NULL COMMENT 'Array of Supabase image URLs',
  ingredients JSON NOT NULL COMMENT 'Array of ingredients',
  posted_by VARCHAR(100) NOT NULL,
  special_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT check_recipe_images CHECK (JSON_VALID(recipe_images)),
  CONSTRAINT check_ingredients CHECK (JSON_VALID(ingredients))
);
