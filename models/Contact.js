import mongoose,  { Schema, model} from "mongoose";
import Joi from "joi";
import { handleSaveError, addUpdateSettings } from "./hooks.js";

mongoose.Schema.Types.String.cast(false);

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
    "any.required": "missing required name field",
  }),
  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),
  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

export const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "missing field favorite",
  }),
});
const Contacts = model("contacts", contactsSchema);

export default Contacts;


