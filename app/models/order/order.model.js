import mongoose from "mongoose";
import { orderSchema } from "./order.schema.js";

const Order = mongoose.model("Order", orderSchema);

export { Order };
