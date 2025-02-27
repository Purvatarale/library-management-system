import { Router } from "express";
import {
  createUser,
  getAuthenticatedUser,
} from "../controller/user.controller.js";

const router = Router();

router.post("/register", createUser);
router.get("/getAuthenticatedUser", getAuthenticatedUser);

export default router;
