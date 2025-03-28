import express from "express";
import {
  createNewIngredients,
  deleteIngredientsById,
  getAllIngredientss,
  getIngredientsById,
  updateIngredientsById,
} from "./ingredients.controller";

const router = express.Router();

router.get("/", getAllIngredientss);
router.get("/:id", getIngredientsById);
router.post("/", createNewIngredients);
router.put("/:id", updateIngredientsById);
router.delete("/:id", deleteIngredientsById);

export default router;
