import { Router } from "express";
import {
  createNewProduct,
  deleteProductById,
  getProductById,
  getProducts,
  updateProductById,
} from "../Controller/productController.js";

const router = Router();

router.route("/").get(getProducts).post(createNewProduct);

//find by id route
router
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

export default router;
