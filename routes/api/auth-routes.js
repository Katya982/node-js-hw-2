import express from "express";
import authController from "../../controllers/auth-controller.js";
import {isEmptyBody} from "../../middlewares/index.js"
import { signinSchema, signupSchema } from "../../models/User.js";
import authenticate from "../../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", isEmptyBody, authController.signup);
authRouter.post("/login", isEmptyBody, authController.signin);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.post("/logout", authenticate, authController.signout);

export default authRouter;



