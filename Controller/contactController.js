const { default: mongoose } = require("mongoose");
const Contacts = require("../model/contactModel");
const asyncHandler = require("express-async-handler");

//@desc get all contact
//@get /api/contacts
//@access private

const getAllContacts = async (req, res) => {
  try {
    const contact = await Contacts.find({ user_id: req.user.id }).sort("name")
    res.status(201).json(contact);
  } catch (err) {
    console.log(err);
  }
};

//@desc get single contact
//@get /api/contacts
//@access private

const getContactsById = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "id is not valid" });
    return;
  }
  try {
    const contact = await Contacts.findById(id);
    if (!contact) {
      res.status(404).json({ message: "your contacts has been delete" });
      return;
    }
    if (contact.user_id.toString() !== req.user.id) {
      res
        .status(404)
        .json({ message: "you are not b able to get this contact" });
      return;
    }

    res.status(201).json(contact);
  } catch (err) {
    console.log(err);
  }
};

//@desc create  contact
//@get /api/contacts
//@access private

const createContacts = asyncHandler(async (req, res) => {
  const { phone, email, name, relation } = req.body;

  if (!name || !phone  ) {
    res.status(400);
    return res.send("All the field are mendatory");
  }
  try {
    const contact = await Contacts.create({
      user_id: req.user.id,
      name,
      relation,
      phone,
      email,
    });

    res.status(201).json(contact);
  } catch (err) {
    console.log(err);
    
  }
});

//@desc update contact
//@get /api/contacts
//@access private

const updateContacts = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "id is not valid" });
    return;
  }

  try {
    const contact = await Contacts.findOneAndUpdate(
      { _id: id },
      { $set: { "objectName": req.body.objectName } },
      { returnNewDocument: true }
    );
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    if (contact.user_id.toString() !== req.user.id) {
      res.status(403).json({ message: "Unauthorized to update this contact" });
      return;
    }

    res.send(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating contact" });
  }
};

//@desc delete contact
//@get /api/contacts
//@access private

const deleteContacts = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "id is not valid" });
    return;
  }

  try {
    const findContact = await Contacts.findById(id);

    if (!findContact) {
      res.status(404).json({ message: "could not foun the contacts" });
      return;
    }
    if (findContact.user_id.toString() !== req.user.id) {
      res
        .status(404)
        .json({ message: "you are not b able to delete this contact" });
      return;
    }
    const contact = await Contacts.findOneAndDelete({ _id: id });
    res.status(201).json(contact);
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  getAllContacts,
  updateContacts,
  deleteContacts,
  getContactsById,
  createContacts,
};
