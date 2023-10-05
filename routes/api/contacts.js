const express = require('express')
const ContactsService = require("../../models/contacts.js");
const { contactAddSchema } = require('../../schemas/contact.js');
const { HttpError } = require("../../helpers/HttpError.js");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await ContactsService.listContacts();
    res.json(result)
  } catch (error) {
    next(error)
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ContactsService.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await ContactsService.addContact(req.body);
    return res.status(201).json(result)
  } catch (error){
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
   try {
     const { contactId } = req.params;
     const result = await ContactsService.removeContact(contactId);
      if (!result) {
            throw HttpError(404, "Not found");
        }
      
        return res.status(200).json({"message": "contact deleted"});
    }
    catch(error) {
        next(error);
    }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    if (JSON.stringify(req.body) === '{}') {
      throw HttpError(400, "missing fields");
    }
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId  } = req.params;
    const result = await ContactsService.updateContacts(contactId , req.body);
    if (!result) {
     throw HttpError(404, "Not found");
    };

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
