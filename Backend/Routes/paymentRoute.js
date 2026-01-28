import { Router } from "express";
import { protect } from "../Controller/authController.js";
import { initiateKhaltiPayment } from "../Controller/paymentController.js";

const router = Router();

//initiate payment route
router.post("/khalti/initiate", protect, initiateKhaltiPayment);

export default router;
