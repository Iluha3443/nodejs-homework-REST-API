const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveError, runValidatorsAtUpdate } = require("../models/hooks");

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    avatarURL: {
    type: String,
  },
    token: {
        type: String,
        default: null,
    },
});

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const userSignupSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    subscription: Joi.string(),
});

const userSigninSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
});

const User = model("user", userSchema);

module.exports = {
    User,
    userSignupSchema,
    userSigninSchema
};