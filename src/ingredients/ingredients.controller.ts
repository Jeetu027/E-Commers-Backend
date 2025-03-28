import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  findAll,
  findById,
  createIngredients,
  updateIngredients,
  deleteIngredients,
} from "./ingredients.service";
import { IngredientsType, IngredientsTypeUpadte } from "./ingredients.types";

const getAllIngredientss = async (
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

const getIngredientsById = async (
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

const createNewIngredients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createIngredients(req.body as IngredientsType);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateIngredientsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await updateIngredients(
      id,
      req.body as IngredientsTypeUpadte
    ); // Pass the id and updated data to the service
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteIngredientsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteIngredients(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  getAllIngredientss,
  getIngredientsById,
  createNewIngredients,
  updateIngredientsById,
  deleteIngredientsById,
};
