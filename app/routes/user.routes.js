import express from "express";
import { auth } from "../middleware/auth.js";
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

export { userRouter };
