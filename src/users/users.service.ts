import { QueryResult } from "pg";
import { pool } from "../config/config";
import { CustomError } from "../errorHandle/errorHandle";
import { UsersType, UsersTypeUpadte } from "./users.types";

// Find all Userss
const findAll = async () => {
  const result: QueryResult<UsersType> = await pool.query(
    "SELECT * FROM Users ORDER BY id ASC"
  );
  if (result.rows.length === 0) {
    throw new CustomError("Users not found!", 404);
  }
  return result.rows;
};

// Find Users by ID
const findById = async (id: string) => {
  const result: QueryResult<UsersType> = await pool.query(
    "SELECT * FROM Users WHERE id = $1",
    [id]
  );
  if (result.rows.length === 0) {
    throw new CustomError(`Users with ID ${id} not found!`, 404);
  }
  return result.rows[0]; // Return single Users item
};

// Create new Users
const createUsers = async (UsersData: UsersType) => {
  const { name, img } = UsersData;
  const result: QueryResult<UsersType> = await pool.query(
    `INSERT INTO Users (name, img) 
     VALUES ($1, $2) RETURNING *`,
    [name, img]
  );
  return result.rows[0];
};

// Update Users
const updateUsers = async (UsersData: UsersTypeUpadte) => {
  const { id } = UsersData;
  const oldData = await findById(id);
  const updatedData = {
    ...oldData,
    ...Object.fromEntries(
      Object.entries(UsersData).filter(([_, value]) => value !== undefined)
    ),
  };

  const { name: newName, img: newImg } = updatedData;

  const result: QueryResult<UsersType> = await pool.query(
    `UPDATE Users 
     SET name = $1, img = $2
     WHERE id = $3 RETURNING *`,
    [newName, newImg, id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Users with ID ${id} not found!`, 404);
  }

  return result.rows[0];
};

// Delete Users
const deleteUsers = async (id: string) => {
  await findById(id);
  const result: QueryResult<UsersType> = await pool.query(
    "DELETE FROM Users WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rows.length === 0) {
    throw new CustomError(`Users with ID ${id} not found!`, 404);
  }

  return { message: "Users deleted successfully" };
};

export { findAll, findById, createUsers, updateUsers, deleteUsers };
