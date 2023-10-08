const express = require('express');
const ContactsService = require("../../controllers/contacts-controller")

const router = express.Router()

router.get('/', ContactsService.getAll)

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', ContactsService.addContact)

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
