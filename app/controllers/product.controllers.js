import { Product } from "../models/product/product.model.js";
import { Wishlist } from "../models/wishlist/wishlist.model.js";

export const createProduct = async (req, res) => {
  const product = new Product({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getUserProducts = async (req, res) => {
  try {
    await req.user.populate("products");
    res.send(req.user.products);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const product = await Product.findOne({ _id });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    await product.populate("reviews.owner");
    res.send(product);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("owner", "isAdmin");
    if (!products) {
      return res.status(404).send({ message: "No products available" });
    }
    if (req.query.admin === "true") {
      res.send(products.filter((element) => element.owner.isAdmin === true));
    } else {
      res.send(products);
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};
export const createProductReview = async (req, res) => {
  const _id = req.params.id;
  const { name, title, description, rating } = req.body;
  try {
    const product = await Product.findOne({ _id });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    const alreadyReviewed = product.reviews.find((r) =>
      r.owner.equals(req.user._id)
    );
    if (alreadyReviewed) {
      return res.status(400).send({ message: "Product already reviewed" });
    }
    const review = {
      name: name,
      title: title,
      description: description,
      rating: Number(rating),
      owner: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const deleteUserProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    let product = await Product.findOne({ _id, owner: req.user._id });
    if (!product) {
      product = await Product.findOne({ _id });
      if (!product || !req.user.isAdmin) {
        return res
          .status(404)
          .send({ message: "Error removing product, please try again" });
      }
    }
    await product.remove();
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const updateUserProduct = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "image",
    "brand",
    "model",
    "category",
    "description",
    "price",
    "cntInStock",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }
  try {
    let product = await Product.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!product) {
      product = await Product.findOne({
        _id: req.params.id,
      });
      if (!product || !req.user.isAdmin) {
        return res
          .status(404)
          .send({ message: "Error updating product, please try again" });
      }
    }
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(1);
    if (!products) {
      return res
        .status(404)
        .send({ message: "Error getting products, please try again" });
    }
    res.send(products);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getAllUserReviews = async (req, res) => {
  // const _id = req.params.id;
  // const reviews = await Product.find({ "reviews.owner": _id }, "reviews");
  // for (let i = 0; i < reviews.length; i++) {
  //   const product = await Product.findOne({ _id: reviews[i]._id });
  //   const index = product.reviews.findIndex((review) =>
  //     review.owner.equals(_id)
  //   );
  //   console.log(product.reviews[index].rating);
  //   const oldRating = product.rating;
  //   const oldNumReviews = product.numReviews;
  //   product.numReviews--;
  //   product.rating =
  //     (oldRating * oldNumReviews - product.reviews[index].rating) /
  //     product.numReviews;
  //   product.reviews.splice(index, 1);
  //   await product.save();
  // }
  // res.send();
  const _id = req.params.id;
  const products = await Product.find({ owner: _id });
  console.log(products.length);
  res.send();
};
