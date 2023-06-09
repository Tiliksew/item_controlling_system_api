"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class User extends sequelize_1.Model {
}
User.init({
    phone: sequelize_1.DataTypes.STRING,
    bankId: sequelize_1.DataTypes.STRING,
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, { sequelize: sequelize_2.default, modelName: 'my_user' });
exports.default = User;
//# sourceMappingURL=user.js.map