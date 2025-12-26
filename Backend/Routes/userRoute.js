import express from "express";
import { login, logout, signup } from "../Controller/authController.js";

const router = express.Router();

//for signup
router.post("/signup", signup);

//for login
router.post("/login", login);
//for logout
router.get("/logout", logout);

export default router;
