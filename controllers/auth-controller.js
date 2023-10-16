const { User } = require("../models/User");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/crtlWrapper");
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
     const { email, password } = req.body;
     const emailUser = await User.findOne({ email });
     if (emailUser) {
          throw HttpError(409, "Email in use")
     };
     const hashPassword = await bcrypt.hash(password, 10);
     const user = await User.create({ ...req.body, password: hashPassword });
     res.status(201).json({
          email: user.email,
          subscription: user.subscription
     });
};

const signin = async (req, res) => {
     if (!req.body) {
          throw HttpError(400)
     };
      const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) {
          throw HttpError(401, "Email or password is wrong")
     };
     const passwordCompare = await bcrypt.compare(password, user.password)
      if (!passwordCompare) {
          throw HttpError(401, "Email or password is wrong")
     };
     const token = 'djkgndfkjnhdfknhf';
     res.json(token)
}


module.exports = ({
     signup: ctrlWrapper(signup),
     signin: ctrlWrapper(signin),
});