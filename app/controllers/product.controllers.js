import { Product } from "../models/product/product.model.js";

export const createProduct = async (req, res) => {
  const product = new Product({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

export const getUserProducts = async (req, res) => {
  try {
    await req.user.populate("products");
    res.send(req.user.products);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

export const getUserProduct = async (req, res) => {
  const _id = req.params.id;

  try {
    const product = await Product.findOne({ _id, owner: req.user._id });

    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("owner", "isAdmin");
    if (!products) {
      return res.status(404).send();
    }
    if (Object.keys(req.body).includes("isAdmin")) {
      res.send(
        products.filter((element) => element.owner.isAdmin === req.body.isAdmin)
      );
    } else {
      res.send(products);
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};
export const createProductReview = async (req, res) => {
  const _id = req.params.id;
  const { name, title, description, rating } = req.body;
  try {
    const product = await Product.findOne({ _id });
    if (!product) {
      return res.status(404).send();
    }
    const alreadyReviewed = product.reviews.find(
      (r) => r.owner === req.user._id
    );
    if (alreadyReviewed) {
      res.status(400).send();
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
    res.status(500).send({ error: e.message });
  }
};

export const deleteUserProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    let product = await Product.findOne({ _id, owner: req.user._id });
    if (!product) {
      product = await Product.findOne({ _id });
      if (!product || !req.user.isAdmin) {
        return res.status(404).send();
      }
    }
    await product.remove();
    res.send();
  } catch (e) {
    res.status(500).send({ error: e.message });
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
    return res.status(400).send({ error: "Invalid updates!" });
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
        return res.status(404).send();
      }
    }
    updates.forEach((update) => (product[update] = req.body[update]));
    await product.save();
    res.send(product);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

export const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(1);
    if (!products) {
      return res.status(404).send();
    }
    res.send(products);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};
