const express = require('express');
const ContactsService = require("../../controllers/contacts-controller");
const isEmptyBody = require("../../middlewares/isEmptyBody");
const isValidId = require("../../middlewares/isValidId");
const validateBody = require("../../decorators/validateBody");
const { schemas } = require('../../models/Contact');
const authenticate = require('../../middlewares/authenticate')

const router = express.Router();

router.use(authenticate)

router.get('/', ContactsService.getAll);

router.get('/:contactId', isValidId, ContactsService.getContactById);

router.post('/', ContactsService.addContact);

router.delete('/:contactId', isValidId, ContactsService.deleteById)

router.put('/:contactId', isValidId, isEmptyBody, validateBody(schemas.addSchema), ContactsService.updateContacts);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ContactsService.updateStatusContact);

module.exports = router;



