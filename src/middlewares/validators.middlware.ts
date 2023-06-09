import { NextFunction } from "express";
import {
  body,
  ValidationChain,
  validationResult,
  ValidationError,
} from "express-validator";

export const itemValidator: ValidationChain[] = [
  body("itemNo").isLength({ min: 3 }),
  body("quantity").isLength({ min: 3 }),
  body("amount").isLength({ min: 6 }),
];

export const fileValidator: ValidationChain[] = [
  body("file").custom((value: any, { req }) => {
    if (!req.file) {
      console.log("The Express validator error");
      throw new Error("No file uploaded!");
    }
    return true;
  }),
];

export const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];
  errors
    .array()
    .map((err: any) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
    statusCode: 422,
  });
};
