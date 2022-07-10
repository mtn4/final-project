import mongoose from "mongoose";
import { wishlistSchema } from "./wishlist.schema.js";

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export { Wishlist };
