CREATE DATABASE IF NOT EXISTS recipe_db;
USE recipe_db;

CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_name VARCHAR(255) NOT NULL,
  recipe_description VARCHAR(200) NOT NULL COMMENT 'Brief description of the recipe',
  recipe_procedure VARCHAR(1200) NOT NULL COMMENT 'Detailed cooking procedure',
  recipe_image VARCHAR(512) NOT NULL COMMENT 'Supabase image download URL',
  ingredients JSON NOT NULL COMMENT 'Array of ingredients',
  posted_by VARCHAR(100) NOT NULL,
  special_notes TEXT,
  cook_time INT NOT NULL COMMENT 'Cooking time in minutes',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT check_ingredients CHECK (JSON_VALID(ingredients))
);

CREATE TABLE IF NOT EXISTS recipe_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT NOT NULL,
  categories JSON NOT NULL COMMENT 'Array of category strings',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  CONSTRAINT check_categories CHECK (JSON_VALID(categories))
);

CREATE TABLE IF NOT EXISTS recipe_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  recipe_id INT NOT NULL,
  total_reviews INT NOT NULL DEFAULT 0,
  positive_reviews INT NOT NULL DEFAULT 0,
  negative_reviews INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
  CONSTRAINT check_reviews CHECK (
    total_reviews >= 0 AND
    positive_reviews >= 0 AND
    negative_reviews >= 0 AND
    total_reviews = positive_reviews + negative_reviews
  )
);
