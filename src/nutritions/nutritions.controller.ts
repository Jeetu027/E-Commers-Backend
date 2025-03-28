import { Request, Response, NextFunction, RequestHandler } from "express";
import {
  findAll,
  findById,
  createNutritions,
  updateNutritions,
  deleteNutritions,
} from "./nutritions.service";
import { NutritionsType, NutritionsTypeUpadte } from "./nutritions.types";

const getAllNutritionss = async (
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

const getNutritionsById = async (
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

const createNewNutritions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await createNutritions(req.body as NutritionsType);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateNutritionsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const result = await updateNutritions(id, req.body as NutritionsTypeUpadte); // Pass the id and updated data to the service
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteNutritionsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await deleteNutritions(id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export {
  getAllNutritionss,
  getNutritionsById,
  createNewNutritions,
  updateNutritionsById,
  deleteNutritionsById,
};
