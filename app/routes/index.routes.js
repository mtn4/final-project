import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { productRouter } from "./product.routes.js";
import { orderRouter } from "./order.routes.js";

const indexRoute = Router();

indexRoute.use("/users", userRouter);
indexRoute.use("/products", productRouter);
indexRoute.use("/orders", orderRouter);

export { indexRoute };
