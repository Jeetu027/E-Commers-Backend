import { QueryResult } from "pg";
import { pool } from "../config/config";
import { CustomError } from "../errorHandle/errorHandle";
import { IngredientsType, IngredientsTypeUpadte } from "./ingredients.types";

// Find all Ingredientss
const findAll = async () => {
  const result: QueryResult<IngredientsType> = await pool.query(
    "SELECT * FROM Ingredients ORDER BY id ASC"
  );
  if (result.rows.length === 0) {
    throw new CustomError("Ingredientss not found!", 404);
  }
  return result.rows;
};

// Find Ingredients by ID
const findById = async (id: string) => {
  const result: QueryResult<IngredientsType> = await pool.query(
    "SELECT * FROM Ingredients WHERE id = $1",
    [id]
  );
  if (result.rows.length === 0) {
    throw new CustomError(`Ingredients with ID ${id} not found!`, 404);
  }
  return result.rows[0]; // Return single Ingredients item
};

// Create new Ingredients
const createIngredients = async (IngredientsData: IngredientsType) => {
  const { name, quantity, food_id } = IngredientsData;
  const result: QueryResult<IngredientsType> = await pool.query(
    `INSERT INTO Ingredients (name, quantity, food_id)
     VALUES ($1, $2, $3) RETURNING *`,

    [name, quantity, food_id]
  );
  return result.rows[0];
};

// Update Ingredients
const updateIngredients = async (
  id: string,
  IngredientsData: IngredientsTypeUpadte
) => {
  const oldData = await findById(id);
  const updatedData = {
    ...oldData,
    ...Object.fromEntries(
      Object.entries(IngredientsData).filter(
        ([_, value]) => value !== undefined
      )
    ),
  };

  const { name, quantity, food_id } = updatedData;

  const result: QueryResult<IngredientsType> = await pool.query(
    `UPDATE Ingredients 
     SET name = $1, quantity = $2,food_id = $3
     WHERE id = $4 RETURNING *`,
    [name, quantity, food_id, id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Ingredients with ID ${id} not found!`, 404);
  }

  return result.rows[0];
};

// Delete Ingredients
const deleteIngredients = async (id: string) => {
  await findById(id);
  const result: QueryResult<IngredientsType> = await pool.query(
    "DELETE FROM Ingredients WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Ingredients with ID ${id} not found!`, 404);
  }

  return { message: "Ingredients deleted successfully" };
};

export {
  findAll,
  findById,
  createIngredients,
  updateIngredients,
  deleteIngredients,
};
