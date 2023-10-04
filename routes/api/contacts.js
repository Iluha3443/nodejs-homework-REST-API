const express = require('express')
const ContactsService = require("../../models/contacts.js");
const { contactAddSchema } = require('./validation.js');

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
      return res.status(404).json({ message: "Not found" });
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
      console.log(error)
      return res.status(400).json({ message: error.message });
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
     console.log(result)
      if (!result) {
            return res.status(404).json({ message: "Not found" });
        }
      
        return res.status(200).json({"message": "contact deleted"});
    }
    catch(error) {
        next(error);
    }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(404).json({ message: "Not found" });
    }
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message});
    }

    const { contactId  } = req.params;
    const result = await ContactsService.updateContacts(contactId , req.body);
    console.log(result)
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    };

    return res.status(200).json(result)
  } catch (error) {
    next(error)
  }
});

module.exports = router
