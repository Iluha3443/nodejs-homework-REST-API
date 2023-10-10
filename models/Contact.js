const mongoose = require("mongoose");


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

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
})

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;