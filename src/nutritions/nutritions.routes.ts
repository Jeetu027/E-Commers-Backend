import express from "express";
import {
  createNewNutritions,
  deleteNutritionsById,
  getAllNutritionss,
  getNutritionsById,
  updateNutritionsById,
} from "./nutritions.controller";

const router = express.Router();

router.get("/", getAllNutritionss);
router.get("/:id", getNutritionsById);
router.post("/", createNewNutritions);
router.put("/:id", updateNutritionsById);
router.delete("/:id", deleteNutritionsById);

export default router;
