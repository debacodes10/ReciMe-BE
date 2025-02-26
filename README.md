# ReciMe Backend API

A Node.js and Express backend for a food recipe management system with MySQL database.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the database credentials in `.env`

3. Set up the database:
- Create a MySQL database
- Import the schema from `database/schema.sql`

4. Start the server:
```bash
node app.js
```

## API Endpoints

### Recipe Endpoints

```
GET /api/recipes
GET /api/recipes/:id
POST /api/recipes
PUT /api/recipes/:id
DELETE /api/recipes/:id
```

### Category Endpoints

```
GET /api/categories
GET /api/categories/:recipeId
POST /api/categories
PUT /api/categories/:recipeId
DELETE /api/categories/:recipeId
```

### Review Endpoints

```
GET /api/reviews
GET /api/reviews/:recipeId
POST /api/reviews
POST /api/reviews/:recipeId/add
PUT /api/reviews/:recipeId
DELETE /api/reviews/:recipeId
```

### Request Body Format for POST/PUT

```json
{
  "title": "Recipe Title",
  "ingredients": "Ingredient 1, Ingredient 2, ...",
  "instructions": "Step 1. Do this\nStep 2. Do that...",
  "cooking_time": 30,
  "servings": 4
}
```

## Example Requests

### Adding Categories
```bash
curl -X POST http://localhost:3000/api/categories \
-H "Content-Type: application/json" \
-d '{
  "recipe_id": 1,
  "categories": [
    "Indian",
    "Non-vegetarian",
    "Curry",
    "Main Course"
  ]
}'
```

### Adding Reviews
```bash
# Create initial review stats
curl -X POST http://localhost:3000/api/reviews \
-H "Content-Type: application/json" \
-d '{
  "recipe_id": 1,
  "total_reviews": 5,
  "positive_reviews": 4,
  "negative_reviews": 1
}'

# Add a single review
curl -X POST http://localhost:3000/api/reviews/1/add \
-H "Content-Type: application/json" \
-d '{
  "is_positive": true
}'
```

## Database Schema

### Recipes Table
- `id`: INT (Primary Key, Auto Increment)
- `recipe_name`: VARCHAR(255)
- `recipe_description`: VARCHAR(200)
- `recipe_procedure`: VARCHAR(1200)
- `recipe_image`: VARCHAR(512)
- `ingredients`: JSON
- `posted_by`: VARCHAR(100)
- `special_notes`: TEXT (optional)
- `cook_time`: INT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Recipe Categories Table
- `id`: INT (Primary Key, Auto Increment)
- `recipe_id`: INT (Foreign Key)
- `categories`: JSON
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

### Recipe Reviews Table
- `id`: INT (Primary Key, Auto Increment)
- `recipe_id`: INT (Foreign Key)
- `total_reviews`: INT
- `positive_reviews`: INT
- `negative_reviews`: INT
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

-- end of README --
