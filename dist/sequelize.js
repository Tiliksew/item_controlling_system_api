"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// sequelize.ts
const sequelize_1 = require("sequelize");
console.log('the user', process.env.DB_USER);
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});
sequelize
    .authenticate()
    .then(() => console.log('Connected to MySQL!'))
    .catch((error) => console.error(`Error connecting to MySQL: ${error.message}`));
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map