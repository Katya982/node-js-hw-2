import express from 'express';
import * as contactsController from '../../controllers/contacts-controller.js';

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get('/:contactId', contactsController.getById);

contactsRouter.post("/", contactsController.addContact);

contactsRouter.delete("/:contactId", contactsController.deleteContact);

contactsRouter.put("/:contactId", contactsController.updateContact);

export default contactsRouter;