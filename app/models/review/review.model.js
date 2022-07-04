import mongoose from "mongoose";
import { reviewSchema } from "./review.schema.js";

const Review = mongoose.model("Review", reviewSchema);

export { Review };
