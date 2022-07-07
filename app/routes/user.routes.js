import express from "express";
import multer from "multer";
import sharp from "sharp";
import { auth } from "../middleware/auth.js";
import { User } from "../models/user/user.model.js";
import {
  createUser,
  loginUser,
  logoutUser,
  logoutAllUserInstances,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/user.controllers.js";

const userRouter = express.Router();

userRouter.post("/", createUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", auth, logoutUser);

userRouter.post("/logoutAll", auth, logoutAllUserInstances);

userRouter.get("/me", auth, getUserProfile);

userRouter.patch("/me", auth, updateUserProfile);

userRouter.delete("/me", auth, deleteUser);

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
      .resize({ width: 200, height: 200 })
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
