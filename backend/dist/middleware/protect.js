"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../schemas/user"));
const config_1 = require("../config");
const protect = async (req, res, next) => {
    let token;
    const { headers: { authorization }, } = req;
    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];
            const decode = (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET);
            req.user = user_1.default.findOne({ email: decode.email });
            next();
        }
        catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
};
exports.protect = protect;
//# sourceMappingURL=protect.js.map