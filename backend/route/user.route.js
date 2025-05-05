import { Router } from "express";
import {
  createUser,
  getAuthenticatedUser,
  addBook,
} from "../controller/user.controller.js";

const router = Router();

router.post("/register", createUser);
router.get("/getAuthenticatedUser", getAuthenticatedUser);
router.post("/", addBook);


export default router;
