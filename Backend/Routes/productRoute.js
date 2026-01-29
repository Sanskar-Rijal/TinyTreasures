import { Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  getProductById,
  getallProducts,
  resizeProductImages,
  updateProductById,
  uploadProductImages,
} from "../Controller/productController.js";
import { protect, restrictTo } from "../Controller/authController.js";

const router = Router();

router
  .route("/")
  .get(getallProducts)
  .post(
    protect,
    restrictTo("admin"),
    uploadProductImages,
    resizeProductImages,
    createNewProduct,
  );

//find by id route
router
  .route("/:id")
  .get(getProductById)
  .put(
    protect,
    restrictTo("admin"),
    uploadProductImages,
    resizeProductImages,
    updateProductById,
  )
  .delete(protect, restrictTo("admin"), deleteProductById);

export default router;
