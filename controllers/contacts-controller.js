const Contact = require("../models/Contact");

const getAll = async (req, res) => {
    const result = await Contact.find();
    res.json(result);
};


const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

module.exports = ({
    getAll,
    addContact
})

// const getContactById = async (contactId) => {
//   const contact = await listContacts();
//   const result = contact.find(item => item.id === contactId);
//   return result ;
// };

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(item => item.id === contactId);
//   if (index === -1) {
//     return null;
//   }
    
//   const [result] = contacts.splice(index, 1);
//   await updateContact(contacts);
//   return result;
// };


// const updateContacts = async (id, { name, email, phone }) => {
//   const contacts = await listContacts();
//   const index = contacts.findIndex(item => item.id === id);
//   if (index === -1) {
//     return null;
//   }
//   contacts[index] = { id, name, email, phone };
//   await updateContact(contacts);
//   return contacts[index];
// };
    
