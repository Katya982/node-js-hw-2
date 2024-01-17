import Contact from '../models/Contact.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from "../decorators/index.js";

import {
  contactAddSchema,
  contactUpdateFavoriteSchema,
  contactUpdateSchema,
} from "../models/Contact.js";

const getAll = async (req, res, next) => {
  try {
    const data = await Contact.find();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Contact.findById(id);
    if (data === null) {
      throw HttpError(404);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const data = await Contact.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactUpdateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const data = await Contact.findByIdAndUpdate(id, req.body);
    if (data === null) {
      throw HttpError(404);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = contactUpdateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const data = await Contact.findByIdAndUpdate(id, req.body);
    if (data === null) {
      throw HttpError(404);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Contact.findByIdAndDelete(id);
    if (data === null) {
      throw HttpError(404);
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateContact),
  deleteById: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact)
};