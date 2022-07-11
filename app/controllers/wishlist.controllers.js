import { Wishlist } from "../models/wishlist/wishlist.model.js";

export const addToWishlist = async (req, res) => {
  try {
    let wishlistExists = await Wishlist.findOne({ owner: req.user._id });
    if (!wishlistExists) {
      const wishlist = new Wishlist({ owner: req.user._id });
      wishlist.products;
      await wishlist.save();
      wishlistExists = wishlist;
    }
    const alreadyAdded = wishlistExists.products.findIndex((elem) =>
      elem.product.equals(req.params.id)
    );
    if (alreadyAdded === -1) {
      const products = [...wishlistExists.products, { product: req.params.id }];
      wishlistExists.products = products;
      await wishlistExists.save();
    } else {
      let products = [...wishlistExists.products];
      products.splice(alreadyAdded, 1);
      wishlistExists.products = products;
      await wishlistExists.save();
    }
    res.send(wishlistExists);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
export const getUserWishlistItems = async (req, res) => {
  try {
    const wishlistExists = await Wishlist.findOne({ owner: req.user._id });
    if (!wishlistExists) {
      return res
        .status(400)
        .send({ message: "There are no products in your wishlist" });
    }
    await wishlistExists.populate("products.product");
    res.send(wishlistExists.products);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getProductWishlistStatus = async (req, res) => {
  try {
    const wishlistExists = await Wishlist.findOne({ owner: req.user._id });
    if (!wishlistExists) {
      return res.send(false);
    }
    const alreadyAdded = wishlistExists.products.findIndex((elem) =>
      elem.product.equals(req.params.id)
    );
    if (alreadyAdded === -1) {
      return res.send(false);
    }
    return res.send(true);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
