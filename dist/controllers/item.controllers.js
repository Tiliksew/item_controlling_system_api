"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editItem = exports.removeItem = exports.getAnItem = exports.getAllItems = exports.uploadItems = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
        // console.log("the datas", data[0]);
        const range = xlsx_1.default.utils.decode_range(sheet["!ref"]);
        // const rowValues = [];
        // for (let row = range.s.r; row <= range.e.r; row++) {
        // for (let col = range.s.c; col <= range.e.c; col++) {
        //   const cell = sheet[xlsx.utils.encode_cell({ r: row, c: col })];
        //   if (cell) {
        //     console.log(`Row ${row + 1}, Column ${col + 1}: ${cell.v}`);
        //     // rowValues.push(cell ? cell.v : null);
        //   }
        //   rowValues.push(cell ? cell.v : null);
        // }
        const all = [];
        for (const row of data) {
            var r = row;
            var it = {
                "Item No": r["Item No"],
                "Description": r["Description"],
                " Qty ": r[" Qty "],
                " Rate ": r[" Rate "],
                " Amount ": r[" Amount "],
            };
            if (!it["Item No"] || !it[" Qty "] || !it[" Amount "]) {
                continue;
            }
            else {
                console.log("its of ", it["Item No"], it["Description"], it[" Rate "], it[" Qty "], it[" Amount "]);
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
            // for (const [key, value] of Object.entries(row as string)) {
            //   console.log(`Cell ${key}:`, value);
            // }
            // await User.create();
        }
        res.status(201).json({ message: "File Imported successfully", items: all, length: all.length, alllen: data.length });
    }
    catch (err) {
        next(new MyError_1.default(500, err));
    }
};
exports.uploadItems = uploadItems;
const getAllItems = async (req, res, next) => {
    try {
        const items = await item_1.Item.findAll({ where: { active: true } });
        if (!items) {
            return next(new MyError_1.default(404, "Items not found"));
        }
        res.status(200).json(items);
    }
    catch (err) {
        console.error(err);
        next(new MyError_1.default(500, err));
        // res.status(500).send('An error occurred while retrieving the models');
    }
};
exports.getAllItems = getAllItems;
const getAnItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const items = await item_1.Item.findOne({ where: { id, active: true } });
        if (!items) {
            return next(new MyError_1.default(404, "Item not found"));
        }
        res.status(200).json(items);
    }
    catch (err) {
        console.error(err);
        next(new MyError_1.default(500, err));
    }
};
exports.getAnItem = getAnItem;
const removeItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const item = await item_1.Item.findOne({ where: { id, active: true } });
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
const editItem = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        const item = await item_1.Item.findOne({ where: { id } });
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
//# sourceMappingURL=item.controllers.js.map