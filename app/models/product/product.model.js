import mongoose from "mongoose";
import { productSchema } from "./product.schema.js";

const Product = mongoose.model("Product", productSchema);

export { Product };
