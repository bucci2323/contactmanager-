const asyncHandler= require("express-async-handler")
const Contact = require("../src/models/contacts");
const { where } = require("sequelize");



const getContacts = async (req, res) => {
const contacts =  await Contact.findAll()
  res.status(200).json(contacts);
};

const createContact = asyncHandler( async(req, res) => {
  console.log("the req.body is : ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Your name, email, and phone numbers are Mandatory!!");
  }

  const contact = await Contact.create({
    name, email, phone
  })
  res.status(200).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({where: {id:req.params.id}})
  if(!contact){
    res.status(404);
    throw new Error("Contact not found!1")

  }
  res.status(200).json(contact);
});

// const updateContact= async (req, res) => {
 
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "phone"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   if (!isValidOperation) throw new ValidationError("invalid updates");

//   try {
//     updates.forEach((update) => (req.user[update] = req.body[update]));

//     await req.user.save();
//     res.status(200).json(updates);
//   } catch (e) {
  
//   }
// };

// const updateContact = async (req, res) => {
//   const allowedUpdates = ["name", "email", "phone"];
//   const updates = Object.keys(req.body).filter(update => allowedUpdates.includes(update));

//   if (updates.length !== Object.keys(req.body).length) {
//     return res.status(400).send({ error: "Invalid updates" });
//   }

//   try {
//     updates.forEach(update => req.user[update] = req.body[update]);
    
//     // Save the user and check for validation errors
//     await req.user.save();

//     res.status(200).json(req.user);
//   } catch (error) {
//     console.error("Error updating contact:", error);
//     res.status(500).send({ error: error.message });
//   }
// };




const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findOne({where: {id:req.params.id}})
  if(!contact){
    res.status(404);
    throw new Error("Contact not found!1")

  }
  res.status(200).json(contact); 
  await Contact.destroy({where: {id:req.params.id}})

  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  // updateContact
  deleteContact,
};
