import { Router } from "express";
import { userSchemaValidation } from "../middlewares/userSchemaValidation.middleware.js";
import {
  registerUser,
  getHistory,
  changePassword,
  deleteUser,
} from "../controllers/users.controllers.js";

const router = Router();

router.post("/register", userSchemaValidation, registerUser);
router.get("/history/:id", getHistory);
router.put("/password/:id", changePassword);
router.delete("/user/:id", deleteUser);

export default router;
