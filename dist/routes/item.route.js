"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const item_controller_1 = require("../controllers/item.controller");
const validators_middlware_1 = require("../middlewares/validators.middlware");
const upload_util_1 = require("../utils/upload.util");
const router = express_1.default.Router();
// The multer configuration 
router.post('/upload', upload_util_1.upload.single("file"), validators_middlware_1.fileValidator, validators_middlware_1.validate, item_controller_1.uploadItems);
router.get('/', item_controller_1.getAllItems);
router.get('/:id', item_controller_1.getAnItem);
router.put('/:id', item_controller_1.editItem);
router.delete('/:id', item_controller_1.removeItem);
exports.default = router;
//# sourceMappingURL=item.route.js.map