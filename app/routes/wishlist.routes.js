import express from "express";
import { auth } from "../middleware/auth.js";
import {
  addToWishlist,
  getUserWishlistItems,
} from "../controllers/wishlist.controllers.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/:id", auth, addToWishlist);
wishlistRouter.get("/", auth, getUserWishlistItems);

export { wishlistRouter };
