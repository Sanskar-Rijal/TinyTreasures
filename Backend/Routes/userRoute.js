import express from "express";
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  signup,
  updatePassword,
  restrictTo,
} from "../Controller/authController.js";
import {
  deleteUser,
  getAllUsers,
  getMe,
  getUserbyId,
  resizeUserPhoto,
  updateProfile,
  uploadUserPhoto,
} from "../Controller/userController.js";

const router = express.Router();

//for signup
router.post("/signup", signup);

//for login
router.post("/login", login);
//for logout
router.post("/logout", logout);
//for update password
router.post("/updatePassword", protect, updatePassword);
//for forgotPassword, just to get token
router.post("/forgotPassword", forgotPassword);
//reset password, using the token
router.post("/resetPassword/:token", resetPassword);
//get own profile
router.get("/getMe", protect, getMe);
//updaet userProfile
router.patch(
  "/updateProfile",
  protect,
  uploadUserPhoto,
  resizeUserPhoto,
  updateProfile,
);

//ADMIN ROUTES
//get all users
router.get("/", protect, restrictTo("admin"), getAllUsers);
//find user by id
router
  .route("/:id")
  .get(protect, restrictTo("admin"), getUserbyId)
  .delete(protect, restrictTo("admin"), deleteUser)
  .patch(protect, restrictTo("admin"), updateProfile);

export default router;
