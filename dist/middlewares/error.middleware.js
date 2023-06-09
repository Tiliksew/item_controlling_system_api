"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MyError_1 = __importDefault(require("../constants/MyError"));
exports.default = (err, req, res, next) => {
    console.log("========== err ===========");
    console.log(err);
    const message = err.message || 'Internal Server Error';
    const code = (err instanceof MyError_1.default) ? err.code : 500;
    res.status(code).json({ error: message, statusCode: code });
};
//# sourceMappingURL=error.middleware.js.map