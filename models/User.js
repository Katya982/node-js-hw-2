import { Schema, model } from "mongoose";
import { handleSaveError, addUpdateSettings } from "./hooks.js";
import Joi from "joi";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
    },
    token: {
    type: String,
    default: null,
    },
    verify: {
       type: Boolean,
       default: false,
     },
    verificationToken: {
       type: String,
       required: [true, "Verify token is required"],
     },
  },
  { versionKey: false, timestamps: true }
);


userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", addUpdateSettings);

userSchema.post("findOneAndUpdate", handleSaveError);

export const signupSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "The string is not a valid e-mail.",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Password is required",
    "number.min": "Password should contain at least 6 symbols",
  }),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "The string is not a valid e-mail.",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export const userEmailSchema = Joi.object({
   email: Joi.string().email().required().messages({
     "any.required": "missing required field email",
     "string.email": "The string is not a valid e-mail.",
   }),
 });

const User = model("user", userSchema);

export default User;
