"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = __importDefault(require("../schemas/user"));
const config_1 = require("../config");
// Helper function to verify token asynchronously
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        (0, jsonwebtoken_1.verify)(token.trim(), config_1.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        });
    });
};
const protect = async (req, res, next) => {
    const { cookies: { token = '' } } = req;
    try {
        if (!token) {
            throw new Error("No token");
        }
        const decoded = await verifyToken(token);
        const user = await user_1.default.findOne({ email: decoded.email });
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        console.error("Error caught: ", error.message);
        if (error instanceof Error) {
            switch (error.message) {
                case 'No token':
                    res.status(406).json({ msg: error.message, status: 0 });
                    break;
                default:
                    res.status(500).json({ msg: 'An unexpected error occured', status: 0 });
                    break;
            }
            return;
        }
        if (error.name === "TokenExpiredError") {
            return res
                .status(403)
                .json({ msg: "Token expired, please login again" });
        }
        res.status(401).json({ msg: "Not authorized, token failed" });
    }
};
exports.protect = protect;
//# sourceMappingURL=protect.js.map