import express from "express";
import {
  createNewFood,
  deleteFoodById,
  getAllFoods,
  getFoodById,
  updateFoodById,
} from "./foods.controller";

const router = express.Router();

router.get("/", getAllFoods);
router.get("/:id", getFoodById);
router.post("/", createNewFood);
router.put("/:id", updateFoodById);
router.delete("/:id", deleteFoodById);

export default router;
