import express from "express";
import contactsController from '../../controllers/contacts-controller.js';
import {isEmptyBody, isValidId} from "../../middlewares/index.js";
const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:id", isValidId, contactsController.getById);

contactsRouter.post("/", isEmptyBody, contactsController.addContact);

contactsRouter.delete("/:id", isValidId, contactsController.deleteById);

contactsRouter.put(
  "/:id",
  isValidId,
  isEmptyBody,
  contactsController.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactsController.updateIsContactFavourite
);

export default contactsRouter;