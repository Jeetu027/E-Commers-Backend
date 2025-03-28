import express from "express";
import {
  createNewUsers,
  deleteUsersById,
  getAllUserss,
  getUsersById,
  updateUsersById,
} from "./users.controller";

const router = express.Router();

router.get("/", getAllUserss);
router.get("/:id", getUsersById);
router.post("/", createNewUsers);
router.put("/:id", updateUsersById);
router.delete("/:id", deleteUsersById);

export default router;
