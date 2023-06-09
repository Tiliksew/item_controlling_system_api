"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_controllers_1 = require("../controllers/item.controllers");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// The multer configuration 
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
router.post('/', upload.single("file"), item_controllers_1.uploadItems);
router.get('/', item_controllers_1.getAllItems);
router.get('/:id', item_controllers_1.getAnItem);
router.put('/:id', item_controllers_1.editItem);
router.delete('/:id', item_controllers_1.removeItem);
exports.default = router;
//# sourceMappingURL=item.routes.js.map