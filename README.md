# Recipe Management API

A RESTful API for managing food recipes built with Node.js, Express, and MySQL.

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

### Recipes

- `GET /api/recipes` - Get all recipes
- `GET /api/recipes/:id` - Get a specific recipe
- `POST /api/recipes` - Create a new recipe
- `PUT /api/recipes/:id` - Update a recipe
- `DELETE /api/recipes/:id` - Delete a recipe

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
