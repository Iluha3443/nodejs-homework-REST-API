const { Contact } = require("../models/Contact");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/crtlWrapper");
const fs = require('fs/promises');
const path = require('path');

const postersPath = path.resolve("public", "avatars");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
const { page = 1, limit = 10 } = req.query;
const skip = (page - 1) * limit;
const result = await Contact.find({ owner })
  .skip(skip)
  .limit(limit)
  .populate("owner", "email subscription");
    res.json(result);
};

const getContactById = async (req, res) => {
  const { _id: owner } = req.user;
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId, owner }).lean();
    if (!result) {
      throw HttpError(404, "Not found");
    }
      res.json(result);
};

const addContact = async (req, res) => {
  if (!req.body) {
    throw HttpError(400, error.message);
  }
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateContacts = async (req, res) => {
  const { _id: owner } = req.user;
    const { contactId } = req.params;
     if (JSON.stringify(req.body) === '{}') {
      throw HttpError(400, "missing fields");
    }
    const result = await Contact.findOneAndUpdate({contactId, owner}, req.body);
   if (!result) {
     throw HttpError(404, "Not found");
    };
    res.json(result);
};

const updateStatusContact = async (req, res) => {
   const { _id: owner } = req.user;
    const { contactId } = req.params;
     if (!req.body) {
        throw HttpError(400, `missing field favorite`);
    }
    const result = await Contact.findOneAndUpdate({contactId, owner}, req.body);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};


const deleteById = async (req, res) => {
   const { contactId } = req.params;
    const {_id: owner} = req.user;
     const result = await Contact.findOneAndDelete({_id: contactId});
      if (!result) {
            throw HttpError(404, "Not found");
        }
      
        return res.status(200).json({"message": "contact deleted"});
};
    

module.exports = ({
     getAll: ctrlWrapper(getAll),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContacts: ctrlWrapper(updateContacts),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteById: ctrlWrapper(deleteById),
})






