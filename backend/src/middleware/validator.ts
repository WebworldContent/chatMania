import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

const validateRegister: ValidationChain[] = [
  body("name")
    .isString()
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Please re-check name"),
  body("email")
    .isEmail()
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Please re-check email"),
  body("password")
    .isString()
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Please re-check password")
];

const validateLogin: ValidationChain[] = [
  body("email")
    .isEmail()
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Please re-check email"),
  body("password")
    .isString()
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Please re-check password"),
];

const validateMessage = [
  body("message")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Please enter message")
]

const handleValidationError = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const error = validationResult(req);
  if (!error.isEmpty()) { // Check if there are any validation errors
    return res.status(404).send({ error: error.array() });
  }

  next();
};

export { validateRegister, handleValidationError, validateLogin, validateMessage };
