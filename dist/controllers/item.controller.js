"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItem = exports.editItem = exports.getAnItem = exports.getAllItems = exports.uploadItems = void 0;
const xlsx_1 = __importDefault(require("xlsx"));
const MyError_1 = __importDefault(require("../constants/MyError"));
const item_1 = require("../models/item");
const uploadItems = async (req, res, next) => {
    var _a;
    try {
        if (!req.file) {
            return next(new MyError_1.default(400, "No file uploaded"));
        }
        console.log("the reqast file path ", (_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const workbook = xlsx_1.default.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx_1.default.utils.sheet_to_json(sheet);
        const all = [];
        for (const row of data) {
            var r = row;
            var it = {
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
                const newItem = await (0, item_1.createItem)({
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
    }
    catch (err) {
        next(new MyError_1.default(500, err));
    }
};
exports.uploadItems = uploadItems;
// Fetching all the items 
const getAllItems = async (req, res, next) => {
    try {
        const items = await item_1.Item.findAll({ where: { active: true } });
        if (items.length < 1) {
            return next(new MyError_1.default(404, "Items not found"));
        }
        res.status(200).json({ items });
    }
    catch (err) {
        console.error(err);
        next(new MyError_1.default(500, err));
    }
};
exports.getAllItems = getAllItems;
// Fetching an item from param [id]
const getAnItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const item = await item_1.Item.findOne({ where: { id, active: true } });
        if (!item) {
            return next(new MyError_1.default(404, "Item not found"));
        }
        res.status(200).json({ item });
    }
    catch (err) {
        console.error(err);
        next(new MyError_1.default(500, err));
    }
};
exports.getAnItem = getAnItem;
// Editing the item fields
const editItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const item = await item_1.Item.findOne({ where: { itemNo: id } });
        if (!item) {
            return next(new MyError_1.default(404, "Item not found"));
        }
        const { itemNo, description, rate, quantity, amount } = req.body;
        await item.update({ itemNo, description, rate, quantity, amount });
        res.status(200).json({ message: "Item updated successfully" });
    }
    catch (err) {
        console.error(err);
        next(new MyError_1.default(500, err));
    }
};
exports.editItem = editItem;
// Removing the item. [toogling the active field because removing data completely is not recommended] [Data is Important]
const removeItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const item = await item_1.Item.findOne({ where: { itemNo: id, active: true } });
        if (!item) {
            return next(new MyError_1.default(404, "Item not found"));
        }
        // await items.destroy();
        await item.update({ active: false });
        res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (err) {
        console.error(err);
        next(new MyError_1.default(500, err));
    }
};
exports.removeItem = removeItem;
//# sourceMappingURL=item.controller.js.map