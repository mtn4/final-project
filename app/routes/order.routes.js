import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createOrder,
  getUserOrders,
  getUserOrder,
  getAllOrders,
} from "../controllers/order.controllers.js";

const orderRouter = express.Router();

orderRouter.post("/", auth, createOrder);

orderRouter.get("/", auth, getUserOrders);

orderRouter.get("/all", auth, getAllOrders);

orderRouter.get("/:id", auth, getUserOrder);

export { orderRouter };
