const express = require('express');
const ContactsService = require("../../controllers/contacts-controller");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../decorators/validateBody");
const {schemas} = require('../../models/Contact')

const router = express.Router();

router.get('/', ContactsService.getAll);

router.get('/:contactId', isValidId, ContactsService.getContactById);

router.post('/', isEmptyBody, validateBody(schemas.addSchema), ContactsService.addContact);

router.delete('/:contactId', isValidId, ContactsService.deleteById)

router.put('/:contactId', isValidId, isEmptyBody, validateBody(schemas.addSchema), ContactsService.updateContacts);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ContactsService.updateStatusContact);

module.exports = router;



