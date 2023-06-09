"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItem = exports.Item = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class Item extends sequelize_1.Model {
}
exports.Item = Item;
Item.init({
    itemNo: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    rate: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    quantity: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    amount: {
        type: sequelize_1.DataTypes.DOUBLE,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, { sequelize: sequelize_2.default, modelName: "item_list" });
async function createItem(itemData) {
    try {
        const newItem = await Item.create(itemData);
        return newItem;
    }
    catch (error) {
        console.error("Error creating item:", error);
        throw error;
    }
}
exports.createItem = createItem;
//# sourceMappingURL=item.js.map