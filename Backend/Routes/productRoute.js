import { Router  } from "express";
import { getProducts } from "../Controller/productController.js";

const router = Router();

router
.route("/")
.get(getProducts);


export default router;