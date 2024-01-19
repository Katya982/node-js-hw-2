import { Schema, model} from "mongoose";
import Joi from "joi";
import { handleSaveError, addUpdateSettings } from "./hooks.js";

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },

  email: {
    type: String,
  },

  phone: {
    type: String,
  },
    
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
}, {
  versionKey: false,
  timestamps: true
});

contactsSchema.post("save", (error, data, next) => {
    error.status = 400;
    next();
});

contactsSchema.post("save", handleSaveError);

contactsSchema.pre("findOneAndUpdate", addUpdateSettings);

contactsSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required "email" field`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
    "string.base": `"phone" must be string`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": `"name" nmust be string`,
  }),
  email: Joi.string().messages({
    "string.base": `"email" nmust be string`,
  }),
  phone: Joi.string().messages({
    "string.base": `"phone" nmust be string`,
  }),
  favorite: Joi.boolean(),
});

export const contactFavouriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
     "boolean.base": `"favorite" must be true or false`,
  }),
});
const Contact = model("contact", contactsSchema);

export default Contact;



