const { DataTypes, sequelize } = require("../database/connection");



const UserSchema = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    //   trim: true,
      lowercase: true,
    },
    password: {
      type: DataTypes.STRING,
      required:[true, "pls add password"],
      trim: true,

    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });


  

module.exports = UserSchema

