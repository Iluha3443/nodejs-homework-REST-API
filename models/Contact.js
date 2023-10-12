const mongoose = require("mongoose");
const Joi = require('joi');
const {handleSaveError, runValidatorsAtUpdate} = require("../models/hooks")

const contactSchema = new mongoose.Schema({ 
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
});

contactSchema.post("save", handleSaveError);

contactSchema.pre("findOneAndUpdate", runValidatorsAtUpdate);

contactSchema.post("findOneAndUpdate", handleSaveError);

const contactUpdateFavoriteSchema = Joi.object({
   favorite: Joi.boolean().required(),
});

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({ "any.required": "missing required name field" }),
  email: Joi.string().required().messages({ "any.required": "missing required email field" }),
  phone: Joi.string().required().messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean().messages({ "any.required": "missing required favorite field" }),
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = {
  Contact,
  contactAddSchema,
  contactUpdateFavoriteSchema
};