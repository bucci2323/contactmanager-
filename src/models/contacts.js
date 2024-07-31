const { DataTypes, sequelize } = require("../database/connection");



const ContactSchema = sequelize.define("contacts", {
    name: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: DataTypes.STRING,
      required:[true, "pls add phone number"],
      trim: true,

    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });


module.exports = ContactSchema
