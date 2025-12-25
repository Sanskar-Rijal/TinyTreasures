import { Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../Controller/productController.js";
import { protect } from "../Controller/authController.js";

const router = Router();

router.route("/").get(protect, getProducts).post(protect, createNewProduct);

//find by id route
router
  .route("/:id")
  .get(protect, getProductById)
  .put(protect, updateProductById)
  .delete(protect, deleteProductById);

export default router;
