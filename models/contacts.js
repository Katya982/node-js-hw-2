// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from 'nanoid';

// const contactsPath = path.resolve("models", "contacts.json");

// const updateContact = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// export async function listContacts() {
//     const data = await fs.readFile(contactsPath, "utf-8");
//     return JSON.parse(data);
// }

// export async function getContactById(contactId) {
//     const contacts = await listContacts();
//     const result = contacts.find(item => item.id === contactId);
//     return result || null;
// }

// export async function removeContact(contactId) {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(item => item.id === contactId);
//     if (index === -1) {
//        return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
// }

// export async function addContact(data) {
//     const contacts = await getAllContacts(); 
//     const newContacts = {
//         id: nanoid(),
//         ...data,
//     };
//     contacts.push(newContacts);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContacts;
// };

// export async function updateContact(contactId, data) {
//     const contacts = await listContacts();
//     const index = contacts.findIndex(item => item.id === contactId);
//     if (index === -1) {
//         return null;
//     }
//     contacts[index] = { ...contacts[index], ...data };
//     await updateContact(contacts);
// } 


import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.resolve("models", "contacts.json");

async function upDate(allContacts) {
  return fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);

  const listContacts = JSON.parse(data);
  return listContacts;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((item) => item.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await upDate(allContacts);
  return result;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);
  await upDate(allContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { ...allContacts[index], ...body };
  await upDate(allContacts);
  return allContacts[index];
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};