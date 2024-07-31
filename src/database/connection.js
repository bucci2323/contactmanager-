const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("contacts", "root", "123456789", {
  host: "127.0.0.1",
  dialect: "mysql",
  operatorsAliases: 0,
});

module.exports = { sequelize, DataTypes };
