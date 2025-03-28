import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  findAll,
  findById,
  createUsers,
  updateUsers,
  deleteUsers,
} from "./users.service";
import { UsersType, UsersTypeUpadte } from "./users.types";

const getAllUserss = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("111");
  try {
    const result = await findAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getUsersById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("222");
  try {
    const { id } = req.params;
    const result = await findById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createNewUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createUsers(req.body as UsersType);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateUsersById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, img } = req.body;

    const result = await updateUsers({ id, name, img }); // Pass the id and updated data to the service
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteUsersById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteUsers(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  getAllUserss,
  getUsersById,
  createNewUsers,
  updateUsersById,
  deleteUsersById,
};
