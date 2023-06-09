import {  Model, DataTypes } from "sequelize";
import sequelize from "../config/sequelize";

class Item extends Model {}
Item.init(
  {
    itemNo: {
      type: DataTypes.STRING,

    },
    description: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.DOUBLE,
    },
    quantity: {
      type: DataTypes.DOUBLE,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "item_list" }
);
async function createItem(itemData:any) {
  try {
    const newItem = await Item.create(itemData);
    return newItem;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
}
export  {Item,createItem};
