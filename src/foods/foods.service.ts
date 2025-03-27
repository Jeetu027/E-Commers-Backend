import { pool } from "../config/config";
import { CustomError } from "../errorHandle/errorHandle";
import { FoodType } from "./foods.types";

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
    nutrition_id,
  } = foodData;
  const result = await pool.query(
    `INSERT INTO food (name, description, type, time, category_id, created_at, created_by, nutrition_id) 
     VALUES ($1, $2, $3, $4, $5, NOW(), $6, $7) RETURNING *`,
    [name, description, type, time, category_id, created_by, nutrition_id]
  );
  return result.rows[0];
};

// Update food
const updateFood = async (
  id: string,
  name: string,
  description: string,
  type: string,
  time: string,
  category_id: string
) => {
  const result = await pool.query(
    `UPDATE food 
     SET name = $1, description = $2, type = $3, time = $4, category_id = $5 
     WHERE id = $6 RETURNING *`,
    [name, description, type, time, category_id, id]
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
