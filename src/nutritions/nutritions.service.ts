import { QueryResult } from "pg";
import { pool } from "../config/config";
import { CustomError } from "../errorHandle/errorHandle";
import { NutritionsType, NutritionsTypeUpadte } from "./nutritions.types";

// Find all Nutritionss
const findAll = async () => {
  const result: QueryResult<NutritionsType> = await pool.query(
    "SELECT * FROM Nutritions ORDER BY id ASC"
  );
  if (result.rows.length === 0) {
    throw new CustomError("Nutritionss not found!", 404);
  }
  return result.rows;
};

// Find Nutritions by ID
const findById = async (id: string) => {
  const result: QueryResult<NutritionsType> = await pool.query(
    "SELECT * FROM Nutritions WHERE id = $1",
    [id]
  );
  if (result.rows.length === 0) {
    throw new CustomError(`Nutritions with ID ${id} not found!`, 404);
  }
  return result.rows[0]; // Return single Nutritions item
};

// Create new Nutritions
const createNutritions = async (NutritionsData: NutritionsType) => {
  const { calories, carbohydrates, cholesterol, protein, total_fat } =
    NutritionsData;
  const result: QueryResult<NutritionsType> = await pool.query(
    `INSERT INTO Nutritions (calories,carbohydrate,cholestrole,protein,total_fat)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [calories, carbohydrates, cholesterol, protein, total_fat]
  );
  return result.rows[0];
};

// Update Nutritions
const updateNutritions = async (
  id: string,
  NutritionsData: NutritionsTypeUpadte
) => {
  const oldData = await findById(id);
  const updatedData = {
    ...oldData,
    ...Object.fromEntries(
      Object.entries(NutritionsData).filter(([_, value]) => value !== undefined)
    ),
  };

  const { calories, carbohydrates, cholesterol, protein, total_fat } =
    updatedData;

  const result: QueryResult<NutritionsType> = await pool.query(
    `UPDATE Nutritions 
     SET calories = $1, carbohydrates = $2, cholesterol = $3, protein = $4, total_fat = $5
     WHERE id = $6 RETURNING *`,
    [calories, carbohydrates, cholesterol, protein, total_fat, id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Nutritions with ID ${id} not found!`, 404);
  }

  return result.rows[0];
};

// Delete Nutritions
const deleteNutritions = async (id: string) => {
  await findById(id);
  const result: QueryResult<NutritionsType> = await pool.query(
    "DELETE FROM Nutritions WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Nutritions with ID ${id} not found!`, 404);
  }

  return { message: "Nutritions deleted successfully" };
};

export {
  findAll,
  findById,
  createNutritions,
  updateNutritions,
  deleteNutritions,
};
