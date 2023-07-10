import { Router } from "express";
import { uploader } from "../utils.js";
import {
	getProducts,
	getProductById,
	addProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProducts);

router.get("/:pid", getProductById);

router.post("/", uploader.array("thumbnails", 10), addProduct);

router.put("/:pid", updateProduct);

router.delete("/:pid", deleteProduct);

export default router;