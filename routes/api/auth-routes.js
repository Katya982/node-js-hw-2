import express from "express";
import authController from "../../controllers/auth-controller.js";
import {isEmptyBody} from "../../middlewares/index.js"
import authenticate from "../../middlewares/authenticate.js";
import { upload } from "../../middlewares/upload.js";
import { isNoImage } from "../../middlewares/isNoImage.js";

const authRouter = express.Router();

authRouter.post("/login", isEmptyBody, authController.signin);
authRouter.post("/register", isEmptyBody, authController.signup);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);
authRouter.patch("/avatars", upload.single("avatarURL"), isNoImage, authenticate, authController.updateAvatar);

authRouter.get("/verify/:verificationToken", authController.verify);
authRouter.post("/verify", isEmptyBody, authController.resendVerification);

export default authRouter;



