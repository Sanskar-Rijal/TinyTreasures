import express from "express";
import { login, signup } from "../Controller/authController.js";

const router = express.Router();

//for signup
router.post("/signup", signup);

//for login
router.post("/login", login);

export default router;
