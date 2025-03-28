import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  findAll,
  findById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.service";
import { CategoryType, CategoryTypeUpadte } from "./category.types";

const getAllCategorys = async (
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

const getCategoryById = async (
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

const createNewCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createCategory(req.body as CategoryType);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await updateCategory(id, req.body as CategoryTypeUpadte); // Pass the id and updated data to the service
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteCategory(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  getAllCategorys,
  getCategoryById,
  createNewCategory,
  updateCategoryById,
  deleteCategoryById,
};
