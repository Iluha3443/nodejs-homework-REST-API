const HttpError = require("../helpers/HttpError");
const {contactAddSchema} = require("../models/Contact")

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = contactAddSchema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }
        next()
    }

    return func;
}

module.exports = validateBody;