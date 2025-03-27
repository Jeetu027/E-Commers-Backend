import express from "express";
import {
  createNewCategory,
  deleteCategoryById,
  getAllCategorys,
  getCategoryById,
  updateCategoryById,
} from "./category.controller";

const router = express.Router();

router.get("/", getAllCategorys);
router.get("/:id", getCategoryById);
router.post("/", createNewCategory);
router.put("/:id", updateCategoryById);
router.delete("/:id", deleteCategoryById);

export default router;
