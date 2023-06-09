"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.fileValidator = exports.itemValidator = void 0;
const express_validator_1 = require("express-validator");
exports.itemValidator = [
    (0, express_validator_1.body)("itemNo").isLength({ min: 3 }),
    (0, express_validator_1.body)("quantity").isLength({ min: 3 }),
    (0, express_validator_1.body)("amount").isLength({ min: 6 }),
];
exports.fileValidator = [
    (0, express_validator_1.body)("file").custom((value, { req }) => {
        if (!req.file) {
            console.log("The Express validator error");
            throw new Error("No file uploaded!");
        }
        return true;
    }),
];
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors
        .array()
        .map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
        statusCode: 422,
    });
};
exports.validate = validate;
//# sourceMappingURL=validators.middlware.js.map