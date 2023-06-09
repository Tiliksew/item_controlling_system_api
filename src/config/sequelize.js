"use strict";
exports.__esModule = true;
// sequelize.ts
var sequelize_1 = require("sequelize");
console.log('the user', process.env.DB_USER);
var sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});
sequelize
    .authenticate()
    .then(function () { return console.log('Connected to MySQL!'); })["catch"](function (error) { return console.error("Error connecting to MySQL: ".concat(error.message)); });
exports["default"] = sequelize;
