"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const generateToken = (id, email) => {
    return (0, jsonwebtoken_1.sign)({ id, email }, config_1.JWT_SECRET, {
        expiresIn: "5h",
    });
};
exports.generateToken = generateToken;
//# sourceMappingURL=generateToken.js.map