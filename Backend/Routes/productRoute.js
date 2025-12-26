import { Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../Controller/productController.js";
import { protect, restrictTo } from "../Controller/authController.js";

const router = Router();

router
  .route("/")
  .get(protect, getProducts)
  .post(protect, restrictTo("admin"), createNewProduct);

//find by id route
router
  .route("/:id")
  .get(protect, getProductById)
  .put(protect, restrictTo("admin"), updateProductById)
  .delete(protect, restrictTo("admin"), deleteProductById);

export default router;
