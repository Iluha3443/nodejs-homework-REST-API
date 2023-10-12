const { Contact } = require("../models/Contact");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/crtlWrapper");

const getAll = async (req, res) => {
    const result = await Contact.find({});
    res.json(result);
};

const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findOne({ _id: contactId }).lean();
    if (!result) {
      throw HttpError(404, "Not found");
    }
      res.json(result);
};

const addContact = async (req, res) => {
     if (!req.body) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};


const updateContacts = async (req, res) => {
    const { contactId } = req.params;
     if (JSON.stringify(req.body) === '{}') {
      throw HttpError(400, "missing fields");
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
   if (!result) {
     throw HttpError(404, "Not found");
    };
    res.json(result);
};

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
     if (!req.body) {
        throw HttpError(400, `missing field favorite`);
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body);
    if (!result) {
        throw HttpError(404, `Not found`);
    }
    res.json(result);
};



const deleteById = async (req,res) => {
  const { contactId } = req.params;
     const result = await Contact.findByIdAndDelete(contactId);
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






