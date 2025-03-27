import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  findAll,
  findById,
  createFood,
  updateFood,
  deleteFood,
} from "./foods.service";
import { FoodType } from "./foods.types";

const getAllFoods = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await findAll();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getFoodById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await findById(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createNewFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createFood(req.body as FoodType);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateFoodById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, description, type, time, category_id } = req.body;
    const result = await updateFood(
      id,
      name,
      description,
      type,
      time,
      category_id
    );
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteFoodById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteFood(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  getAllFoods,
  getFoodById,
  createNewFood,
  updateFoodById,
  deleteFoodById,
};
