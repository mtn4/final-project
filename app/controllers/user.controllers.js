import { User } from "../models/user/user.model.js";

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
    const user = await User.findById(req.params.id);
    await user.remove();
    res.send();
    // await req.user.remove();
    // res.send(req.user);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

export const getAllUseres = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};
