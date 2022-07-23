import { User } from "../models/user/user.model.js";
import { Product } from "../models/product/product.model.js";

export const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    if (user.tokens.length > 5) {
      const tokens = user.tokens.slice(-5);
      user.tokens = tokens;
      await user.save();
    }
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

// export const logoutUser = async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => {
//       return token.token !== req.token;
//     });
//     await req.user.save();

//     res.send();
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// };

// export const logoutAllUserInstances = async (req, res) => {
//   try {
//     req.user.tokens = [];
//     await req.user.save();
//     res.send();
//   } catch (e) {
//     res.status(500).send({ message: e.message });
//   }
// };

export const getUserProfile = async (req, res) => {
  res.send(req.user);
};

export const updateUserProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    const products = await Product.find({ owner: _id });
    if (products.length > 0) {
      return res.status(404).send({ message: "Can't delete this user" });
    }
    const reviews = await Product.find({ "reviews.owner": _id }, "reviews");
    for (let i = 0; i < reviews.length; i++) {
      const product = await Product.findOne({ _id: reviews[i]._id });
      const index = product.reviews.findIndex((review) =>
        review.owner.equals(_id)
      );
      const oldRating = product.rating;
      const oldNumReviews = product.numReviews;
      product.numReviews--;
      product.rating =
        (oldRating * oldNumReviews - product.reviews[index].rating) /
        product.numReviews;
      product.reviews.splice(index, 1);
      await product.save();
    }
    await user.remove();
    res.send();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

export const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "isAdmin"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ message: "Invalid updates!" });
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
