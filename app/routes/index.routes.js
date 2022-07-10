import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { productRouter } from "./product.routes.js";
import { orderRouter } from "./order.routes.js";
import { wishlistRouter } from "./wishlist.routes.js";

const indexRoute = Router();

indexRoute.use("/users", userRouter);
indexRoute.use("/products", productRouter);
indexRoute.use("/orders", orderRouter);
indexRoute.use("/wishlist", wishlistRouter);

export { indexRoute };
