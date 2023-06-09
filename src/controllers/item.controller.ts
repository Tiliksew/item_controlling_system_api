import xlsx from "xlsx";
import { Request, Response } from "express";

import MyError from "../constants/MyError";
import { createItem, Item } from "../models/item";

export const uploadItems = async (req: Request, res: Response, next: any) => {
  try {
    
    if (!req.file) {
      return next(new MyError(400, "No file uploaded"));
    }
    console.log("the reqast file path ", req.file?.path);
    const workbook = xlsx.readFile(req.file.path as string);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    
    const all = [];
    for (const row of data) {
      var r = row as Items;
      var it: Items = {
        "Item No": r["Item No"],
        Description: r["Description"],
        " Qty ": r[" Qty "],
        " Rate ": r[" Rate "],
        " Amount ": r[" Amount "],
      };

      if (!it["Item No"] || !it[" Qty "] || !it[" Amount "]) { // Checking if the data is enough to create item
            continue;
      } 
      else {
            all.push(it);
            const defaultValue = 0.0;
            if (isNaN(it[" Qty "])) {
            it[" Qty "] = defaultValue;
            }
            if (isNaN(it[" Rate "])) {
            it[" Rate "] = defaultValue;
            }
            if (isNaN(it[" Amount "])) {
            it[" Amount "] = defaultValue;
            }
            const newItem = await createItem({
            itemNo: it["Item No"],
            description: it["Description"],
            rate: it[" Rate "],
            quantity: it[" Qty "],
            amount: it[" Amount "],
            });
            await newItem.save();
      }
    }

    // const items = await Item.findAll({ where: { active: true } });

    res.status(201).json({
      message: "Items Imported and Saved successfully",
      items: all,
    });

  } catch (err) {
    next(new MyError(500, err as string));
  }
};

// Fetching all the items 
export const getAllItems = async (req: Request, res: Response, next: any) => {
  try {
    const items = await Item.findAll({ where: { active: true } });
    if (items.length<1) {
      return next(new MyError(404, "Items not found"));
    }
    res.status(200).json({items});
  } catch (err) {
    console.error(err);
    next(new MyError(500, err as string));
  }
};

// Fetching an item from param [id]
export const getAnItem = async (req: Request, res: Response, next: any) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await Item.findOne({ where: { id, active: true } });
    if (!item) {
      return next(new MyError(404, "Item not found"));
    }
    res.status(200).json({item});
  } catch (err) {
    console.error(err);
    next(new MyError(500, err as string));
  }
};

// Editing the item fields
export const editItem = async (req: Request, res: Response, next: any) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await Item.findOne({ where: {itemNo: id } });
    if (!item) {
      return next(new MyError(404, "Item not found"));
    }
    const { itemNo, description, rate, quantity, amount } = req.body;
    await item.update({ itemNo, description, rate, quantity, amount });
    res.status(200).json({ message: "Item updated successfully" });
  } catch (err) {
    console.error(err);
    next(new MyError(500, err as string));
  }
};

// Removing the item. [toogling the active field because removing data completely is not recommended] [Data is Important]
export const removeItem = async (req: Request, res: Response, next: any) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await Item.findOne({ where: { itemNo: id , active: true } });
    if (!item) {
      return next(new MyError(404, "Item not found"));
    }
    // await items.destroy();
    await item.update({ active: false });
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    next(new MyError(500, err as string));
  }
};
