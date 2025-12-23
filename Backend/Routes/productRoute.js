import { Router } from "express";
import {
  createNewProduct,
  getProductById,
  getProducts,
} from "../Controller/productController.js";

const router = Router();

router.route("/").get(getProducts).post(createNewProduct);

//find by id route
router.route("/:id").get(getProductById);

export default router;
