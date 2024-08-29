"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.handleValidationError = exports.validateRegister = void 0;
const express_validator_1 = require("express-validator");
const validateRegister = [
    (0, express_validator_1.body)("name")
        .isString()
        .notEmpty()
        .trim()
        .escape()
        .withMessage("Please re-check name"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .notEmpty()
        .trim()
        .escape()
        .withMessage("Please re-check email"),
    (0, express_validator_1.body)("password")
        .isString()
        .notEmpty()
        .trim()
        .escape()
        .withMessage("Please re-check password")
];
exports.validateRegister = validateRegister;
const validateLogin = [
    (0, express_validator_1.body)("email")
        .isEmail()
        .notEmpty()
        .trim()
        .escape()
        .withMessage("Please re-check email"),
    (0, express_validator_1.body)("password")
        .isString()
        .notEmpty()
        .trim()
        .escape()
        .withMessage("Please re-check password"),
];
exports.validateLogin = validateLogin;
const handleValidationError = (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) { // Check if there are any validation errors
        return res.status(404).send({ error: error.array() });
    }
    next();
};
exports.handleValidationError = handleValidationError;
//# sourceMappingURL=validator.js.map