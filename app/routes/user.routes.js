import express from "express";
import multer from "multer";
import sharp from "sharp";
import { auth, admin } from "../middleware/auth.js";
import { User } from "../models/user/user.model.js";
import {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.get("/me", auth, getUserProfile);

userRouter.patch("/me", auth, updateUserProfile);

userRouter.post("/", createUser);

userRouter.get("/", auth, admin, getAllUsers);

userRouter.get("/:id", auth, admin, getUser);

userRouter.delete("/:id", auth, admin, deleteUser);

userRouter.patch("/:id", auth, admin, updateUser);

userRouter.post("/login", loginUser);

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

userRouter.post(
  "/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

userRouter.delete("/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

userRouter.get("/avatar/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

export { userRouter };
