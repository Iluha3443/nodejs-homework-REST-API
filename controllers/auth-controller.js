const { User } = require("../models/User");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/crtlWrapper");

const signup = (req, res) => {

}


module.exports = ({
     signup: ctrlWrapper(signup)
})