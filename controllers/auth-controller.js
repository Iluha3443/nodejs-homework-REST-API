const { User } = require("../models/User");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/crtlWrapper");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
require('dotenv').config();
const Jimp = require("jimp");
const fs = require('fs/promises');
const path = require('path');
const sendEmail = require('../helpers/sendEmail');
const {nanoid} = require("nanoid");

const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
     const { email, password } = req.body;
     const emailUser = await User.findOne({ email });
     if (emailUser) {
          throw HttpError(409, "Email in use")
     };
     const verificationToken = nanoid();
     const gravatarURL = `https://www.gravatar.com/avatar/${email}?s=200`;
     const hashPassword = await bcrypt.hash(password, 10);
     const user = await User.create({ ...req.body, password: hashPassword, avatarURL: gravatarURL, verificationToken });
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`
    }
    await sendEmail(verifyEmail);
     res.status(201).json({
          email: user.email,
          subscription: user.subscription,
     });
};

const signin = async (req, res) => {
     const { email, password } = req.body;
     const user = await User.findOne({ email });
     if (!user) {
          throw HttpError(401, "Email or password is wrong")
     };
     if (!user.verify) {
           throw HttpError(401, "User is not verify")
     }
     const passwordCompare = await bcrypt.compare(password, user.password)
     if (!passwordCompare) {
          throw HttpError(401, "Email or password is wrong")
     };
     const payload = {
          id: user.id
     };
     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '20h' });
     await User.findByIdAndUpdate(user.id, { token });
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

const updateAvatar = async (req, res) => {
     const postersPath = path.resolve("public", "avatars");
     const {id} = req.user;
     const { path: oldPath, filename } = req.file;
     const newPath = path.join(postersPath, filename);
     const image = await Jimp.read(oldPath);
     image.resize(250, 250).write(oldPath);
     await fs.rename(oldPath, newPath);
     const avatarURL = path.join("avatars", filename);
     await User.findByIdAndUpdate(id, { avatarURL });
     res.json({ avatarURL });
};

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404)
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

    res.json({
        message: "Verify success"
    })
}

const resendVerifyEmail = async (req, res) => {
     const { email } = req.body;
     if (!email) {
          throw HttpError(400, "missing required field email")
     }
     const user = await User.findOne({ email });
     if (user.verify) {
          throw HttpError(400, "Verification has already been passed")
     }

     const verifyEmail = {
          to: email,
          subject: "Verify email",
          html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`
     }
     await sendEmail(verifyEmail);

     res.json({
          message: "Verification email sent"
     });
};

module.exports = ({
     signup: ctrlWrapper(signup),
     signin: ctrlWrapper(signin),
     getCurrent: ctrlWrapper(getCurrent),
     signout: ctrlWrapper(signout),
     updateAvatar: ctrlWrapper(updateAvatar),
     verify: ctrlWrapper(verify),
     resendVerifyEmail: ctrlWrapper(resendVerifyEmail)
});