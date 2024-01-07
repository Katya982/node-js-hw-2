import Contact from '../models/Contact.js';
import { HttpError } from '../helpers/index.js';

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
    const result = await Contact.find({}, "-createdAt -updatedAt");

    res.json(result);
}

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result)
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    message: "Delete success"
  })
};

export default {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(addContact),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}

// const getAll = async (req, res, next) => {
//   try {
//     const result = await Contacts.find();
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const getById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsService.getContactById(contactId);
//     if (!result) {
//       throw HttpError(404, `Contact with id ${contactId} not FOUND!`);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const addContact = async (req, res, next) => {
//   try {
//     if (!Object.keys(req.body).length) {
//       throw HttpError(400, "missing required name field");
//     }

//     const { error } = contactAddSchema.validate(req.body);

//     if (error) {
//       throw HttpError(400, error.message);
//     }

//     const result = await Contacts.create(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const updateContact = async (req, res, next) => {
//   try {
//     const { error } = contactUpDateSchema.validate(req.body);
//     if (error) {
//       throw HttpError(400, error.message);
//     }

//     if (!Object.keys(req.body).length) {
//       throw HttpError(400, "missing field");
//     }

//     const { contactId } = req.params;
//     const result = await contactsService.updateContact(contactId, req.body);

//     if (!result) {
//       throw HttpError(404, `Contact with id ${contactId} not FOUND!`);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteContact = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await contactsService.removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, `Contact with id ${contactId} not FOUND!`);
//     }

//     res.json({
//       message: "contact deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// };


// export default {
//     getAll: ctrlWrapper(getAll),
//     getById: ctrlWrapper(getById),
//     add: ctrlWrapper(addContact),
//     updateById: ctrlWrapper(updateContact),
//     deleteById: ctrlWrapper(deleteContact),
// }