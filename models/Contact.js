import { Schema, model } from "mongoose";
import Joi from "joi";

// import {handleSaveError, addUpdateSettings} from "./hooks.js";

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

// movieSchema.post("save", handleSaveError);

// movieSchema.pre("findOneAndUpdate", addUpdateSettings);

// movieSchema.post("findOneAndUpdate", handleSaveError);

// export const contactAddSchema = Joi.object({
//     title: Joi.string().required().messages({
//         "any.required": `"title" must be exist`
//     }),
//     director: Joi.string().required(),
//     favorite: Joi.boolean(),
//     genre: Joi.string().valid(...genreList).required(),
//     releaseYear: Joi.string().pattern(releaseYearRegexp).required(),
// })

// export const contactUpdateSchema = Joi.object({
//     title: Joi.string(),
//     director: Joi.string(),
//     favorite: Joi.boolean(),
//     genre: Joi.string().valid(...genreList),
//     releaseYear: Joi.string().pattern(releaseYearRegexp),
// })

// export const movieUpdateFavoriteSchema = Joi.object({
//     favorite: Joi.boolean().required()
// });

const Contacts = model("contacts", contactsSchema);

export default Contacts;


