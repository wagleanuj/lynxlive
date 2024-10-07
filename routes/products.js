import express from "express";
import { getMostViewedProducts, getProductById } from "../controllers/productController.js";

const router = express.Router();

router.get('/most-viewed', getMostViewedProducts);
router.get('/:id', getProductById);

export const productRouter = router;