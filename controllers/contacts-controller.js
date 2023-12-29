import * as contactsService from '../models/contacts.js'
import { HttpError } from '../helpers/index.js';
import { contactAddSchema, contactUpDateSchema } from "../schemas/schemas.js";

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not FOUND!`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing required name field");
    }

    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactUpDateSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    if (!Object.keys(req.body).length) {
      throw HttpError(404, "missing field");
    }

    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not FOUND!`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not FOUND!`);
    }

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
export { getAll, getById, addContact, updateContact, deleteContact };