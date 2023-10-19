const { User } = require("../models/User");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/crtlWrapper");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {JWT_SECRET} = process.env;

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
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) {
          throw HttpError(401, "Email or password is wrong")
     };
     const passwordCompare = await bcrypt.compare(password, user.password)
     if (!passwordCompare) {
          throw HttpError(401, "Email or password is wrong")
     };

     const payload = {
          id: user.id
     };

     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '20h' });
     await User.findByIdAndUpdate(user.id, { token });
     
     // res.json({
     //      token,
          
     //      email: user.email,
     //      subscription: user.subscription
     // })

     
const response = {
    token,
    user: {
        email: user.email,
        subscription: user.subscription
    }
};

res.json(response);
};

const getCurrent = async (req, res) => {
     const { subscription, email } = req.user;

     res.json({
          subscription,
          email,
     });
};

const signout = async (req, res) => {
     const {id} = req.user;
     await User.findByIdAndUpdate(id, { token: "" });
     
     res.status(204).send(); 
};


module.exports = ({
     signup: ctrlWrapper(signup),
     signin: ctrlWrapper(signin),
     getCurrent: ctrlWrapper(getCurrent),
     signout: ctrlWrapper(signout),
});