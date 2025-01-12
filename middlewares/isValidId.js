const mongoose = require("mongoose");
const HttpError = require("../helpers/HttpError.js");

const isValidId = (req, res, next)=> {
    const { contactId } = req.params;
    if(!mongoose.isValidObjectId(contactId)) {
        return next(HttpError(400, `${contactId} not valid id`))
    }
    next();
}

module.exports = isValidId;