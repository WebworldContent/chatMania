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
    const { headers: { authorization }, } = req;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.redirect("/login");
    }
    try {
        const token = authorization.split("Bearer ")[1].trim();

        if (!token) {
            res.status(403);
            throw new Error("No authorization token");
        }
        const decoded = await verifyToken(token);
        const user = await user_1.default.findOne({ email: decoded.email });
        if (!user) {
            res.status(401);
            throw new Error("Not authorized, user not found");
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        if (error.name === "TokenExpiredError") {
            return res
                .status(402)
                .json({ message: "Token expired, please login again" });
        }
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};
exports.protect = protect;
//# sourceMappingURL=protect.js.map