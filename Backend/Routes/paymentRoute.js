import { Router } from "express";
import { protect } from "../Controller/authController.js";
import {
  initiateKhaltiPayment,
  verifyKhaltiPayment,
} from "../Controller/paymentController.js";

const router = Router();

//initiate payment route
router.post("/khalti/initiate", protect, initiateKhaltiPayment);
router.post("/khalti/verify", protect, verifyKhaltiPayment);

export default router;
