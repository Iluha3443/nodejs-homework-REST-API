const express = require('express');
const ContactsService = require("../../controllers/contacts-controller");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../decorators/validateBody");
const { contactAddSchema, contactUpdateFavoriteSchema } = require("../../models/Contact");

const router = express.Router();

const contactAddValidate = validateBody(contactAddSchema);
const contactUpdateValidate = validateBody(contactUpdateFavoriteSchema);

router.get('/', ContactsService.getAll);

router.get('/:contactId', isValidId, ContactsService.getContactById);

router.post('/', isEmptyBody, contactAddValidate, ContactsService.addContact);

router.delete('/:contactId', isValidId, ContactsService.deleteById)

router.put('/:contactId', isValidId, isEmptyBody, contactAddValidate, ContactsService.updateContacts);

router.patch('/:contactId/favorite', isValidId, contactUpdateValidate, ContactsService.updateStatusContact);

module.exports = router;
