"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGO_URI = exports.PORT = void 0;
require("dotenv/config");
const PORT = process.env.PORT || 5000;
exports.PORT = PORT;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chatmania';
exports.MONGO_URI = MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'xyzabc123';
exports.JWT_SECRET = JWT_SECRET;
//# sourceMappingURL=config.js.map