import { HttpError } from '../helpers/index.js';
import Contact, {
  contactFavouriteSchema,
  contactAddSchema,
  contactUpdateSchema,
} from "../models/Contact.js";

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  console.log(owner);
  try {
    const result = await Contact.find({owner});
    res.status(200).json(result);
  } catch (error) {}
};

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const result = await Contact.findOne({ _id: id, owner });
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id: owner } = req.user;  
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await Contact.create({ name, email, phone, owner });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const deletedContact = await Contact.findOneAndDelete({ _id: id, owner });
    if (!deletedContact) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;
  const { error } = contactUpdateSchema.validate(req.body);

  try {
    if (error) {
      throw HttpError(400, error.message);
    }
     const updatedContact = await Contact.findOneAndUpdate(
       { _id: id, owner },
       req.body
     );
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

const updateIsContactFavourite = async (req, res, next) => {
  const id = req.params.contactId;
  const { _id: owner } = req.user;
  const { error } = contactFavouriteSchema.validate(req.body);

  try {
    if (error) {
      throw HttpError(400, error.message);
    }
    const updatedContact = await Contact.findOneAndUpdate(
       { _id: id, owner },
       req.body
     );
    console.log(updatedContact, "updatedContact");
    if (!updatedContact) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export default {
  getAll,
  getById,
  addContact,
  deleteById,
  updateById,
  updateIsContactFavourite,
};