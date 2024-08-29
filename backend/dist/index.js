"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const dbConfig_1 = require("./dbConfig");
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const app = (0, express_1.default)();
(0, dbConfig_1.dbConnect)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)()); // Add security to headers
app.use((0, cors_1.default)()); // allowing cors request
app.use(user_1.default);
app.listen(config_1.PORT, () => { console.log(`Running on port : ${config_1.PORT}`); });
//# sourceMappingURL=index.js.map