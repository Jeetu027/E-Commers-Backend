import { pool } from "../config/config";
import { CustomError } from "../errorHandle/errorHandle";
import { FoodType, FoodTypeUpdate } from "./foods.types";
import { findById as findByIdUser } from "../users/users.service";
import { findById as findByIdCategory } from "../category/category.service";
import { create } from "domain";
import { createNutritions } from "../nutritions/nutritions.service";
import { QueryResult } from "pg";
import { createIngredients } from "../ingredients/ingredients.service";

// Find all foods
const findAll = async () => {
  const result = await pool.query("SELECT * FROM food ORDER BY id ASC");
  if (result.rows.length === 0) {
    throw new CustomError("Foods not found!", 404);
  }
  return result.rows;
};

// Find food by ID
const findById = async (id: string) => {
  const result = await pool.query("SELECT * FROM food WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    throw new CustomError(`Food with ID ${id} not found!`, 404);
  }
  return result.rows[0]; // Return single food item
};

// Create new food
const createFood = async (foodData: FoodType) => {
  const {
    name,
    description,
    type,
    time,
    category_id,
    created_by,
    nutrition,
    ingredients,
  } = foodData;
  await findByIdUser(created_by);
  await findByIdCategory(category_id);
  if (!nutrition) {
    throw new CustomError("Nutrition data is required!", 400);
  }
  const nutritionResult = await createNutritions(nutrition);
  const result: QueryResult<FoodType> = await pool.query(
    `INSERT INTO food (name, description, type, time, category_id, created_at, created_by, nutrition_id) 
     VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7) RETURNING *`,
    [name, description, type, time, category_id, created_by, nutritionResult.id]
  );
  if (
    result.rows.length === 0 ||
    result.rows[0].id === null ||
    result.rows[0].id === undefined
  ) {
    throw new CustomError("Food not created!", 400);
  }
  if (!ingredients || ingredients.length === 0) {
    throw new CustomError("Ingredients data is required!", 400);
  }
  for (const ingredient of ingredients) {
    await createIngredients({ ...ingredient, food_id: result.rows[0].id });
  }
  return {
    ...result.rows[0],
    nutrition: nutritionResult,
    ingredients: ingredients,
  };
};

// Update food
const updateFood = async (id: string, foodTypeUpdate: FoodTypeUpdate) => {
  const oldData = await findById(id);
  const updatedData = {
    ...oldData,
    ...Object.fromEntries(
      Object.entries(foodTypeUpdate).filter(([_, value]) => value !== undefined)
    ),
  };
  const { name, description, type, time, category_id, nutrition_id } =
    updatedData;

  const result = await pool.query(
    `UPDATE food 
     SET name = $1, description = $2, type = $3, time = $4, category_id = $5,nutrition_id = $6
     WHERE id = $7 RETURNING *`,
    [name, description, type, time, category_id, nutrition_id, id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Food with ID ${id} not found!`, 404);
  }

  return result.rows[0];
};

// Delete food
const deleteFood = async (id: string) => {
  const result = await pool.query(
    "DELETE FROM food WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Food with ID ${id} not found!`, 404);
  }

  return { message: "Food deleted successfully" };
};

export { findAll, findById, createFood, updateFood, deleteFood };
