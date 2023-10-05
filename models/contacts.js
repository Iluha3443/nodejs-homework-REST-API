const fs = require('fs/promises');
const path = require("path");
const { nanoid } = require('nanoid');

const contactsPath = path.resolve("models", "contacts.json");

const updateContact = contact => fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

 const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data)
};

const getContactById = async (contactId) => {
  const contact = await listContacts();
  const result = contact.find(item => item.id === contactId);
  return result ;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
    
  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContacts = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await updateContact(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts
};
