import { Schema, model } from "mongoose";
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
}, {versionKey: false, timestamps: true});

contactsSchema.post("save", (error, data, next) => {
    error.status = 400;
    next();
});

contactsSchema.post("save", handleSaveError);

contactsSchema.pre("findOneAndUpdate", addUpdateSettings);

contactsSchema.post("findOneAndUpdate", handleSaveError);

export const contactAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": `"title" must be exist`
    }),
    director: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().required(),
    releaseYear: Joi.string().required(),
})

export const contactUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorite: Joi.boolean(),
    genre: Joi.string(),
    releaseYear: Joi.string(),
})

export const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
});

const Contacts = model("contacts", contactsSchema);

export default Contacts;


