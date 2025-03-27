import { QueryResult } from "pg";
import { pool } from "../config/config";
import { CustomError } from "../errorHandle/errorHandle";
import { CategoryType, CategoryTypeUpadte } from "./category.types";

// Find all Categorys
const findAll = async () => {
  const result: QueryResult<CategoryType> = await pool.query(
    "SELECT * FROM category ORDER BY id ASC"
  );
  if (result.rows.length === 0) {
    throw new CustomError("Categorys not found!", 404);
  }
  return result.rows;
};

// Find Category by ID
const findById = async (id: string) => {
  console.log("abc");
  const result: QueryResult<CategoryType> = await pool.query(
    "SELECT * FROM category WHERE id = $1",
    [id]
  );
  if (result.rows.length === 0) {
    throw new CustomError(`Category with ID ${id} not found!`, 404);
  }
  return result.rows[0]; // Return single Category item
};

// Create new Category
const createCategory = async (categoryData: CategoryType) => {
  const { name, img } = categoryData;
  const result: QueryResult<CategoryType> = await pool.query(
    `INSERT INTO category (name, img) 
     VALUES ($1, $2) RETURNING *`,
    [name, img]
  );
  return result.rows[0];
};

// Update Category
const updateCategory = async (categoryData: CategoryTypeUpadte) => {
  const { id } = categoryData;
  const oldData = await findById(id);
  const updatedData = {
    ...oldData,
    ...Object.fromEntries(
      Object.entries(categoryData).filter(([_, value]) => value !== undefined)
    ),
  };

  const { name: newName, img: newImg } = updatedData;

  const result: QueryResult<CategoryType> = await pool.query(
    `UPDATE category 
     SET name = $1, img = $2
     WHERE id = $3 RETURNING *`,
    [newName, newImg, id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Category with ID ${id} not found!`, 404);
  }

  return result.rows[0];
};

// Delete Category
const deleteCategory = async (id: string) => {
  await findById(id);
  const result: QueryResult<CategoryType> = await pool.query(
    "DELETE FROM category WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Category with ID ${id} not found!`, 404);
  }

  return { message: "Category deleted successfully" };
};

export { findAll, findById, createCategory, updateCategory, deleteCategory };
