import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required "name" field`,
    "string.base": `"name" nmust be string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `missing required "email" field`,
    "string.base": `"email" nmust be string`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required "phone" field`,
    "string.base": `"phone" nmust be string`,
  }),
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
});