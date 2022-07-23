import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createProduct,
  getUserProducts,
  getProduct,
  getAllProducts,
  createProductReview,
  deleteUserProduct,
  updateUserProduct,
  getTopProducts,
  getAllUserReviews,
} from "../controllers/product.controllers.js";

const productRouter = express.Router();

productRouter.post("/", auth, createProduct);

productRouter.get("/", auth, getUserProducts);

productRouter.get("/all", getAllProducts);

productRouter.get("/top", getTopProducts);

productRouter.post("/reviews/:id", auth, createProductReview);

productRouter.get("/reviews/:id", getAllUserReviews);

productRouter.delete("/:id", auth, deleteUserProduct);

productRouter.get("/:id", getProduct);

productRouter.patch("/:id", auth, updateUserProduct);

export { productRouter };
