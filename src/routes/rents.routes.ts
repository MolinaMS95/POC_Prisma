import { Router } from "express";
import { rentSchemaValidation } from "../middlewares/rentSchemaValidation.middleware.js";
import { rentRoom } from "../controllers/rents.controllers.js";

const router = Router();

router.post("/rent", rentSchemaValidation, rentRoom);

export default router;