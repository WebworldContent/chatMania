"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAll = exports.fetch = exports.create = void 0;
const user_1 = __importDefault(require("../schemas/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const create = async (data) => {
    const { name, email, password } = data;
    try {
        const userExists = await user_1.default.findOne({ email });
        if (userExists) {
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        return await user_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
    }
    catch (error) {
        throw error;
    }
};
exports.create = create;
const fetch = async (email) => {
    if (!email) {
        return;
    }
    try {
        return await user_1.default.findOne({ email });
    }
    catch (error) {
        throw error;
    }
};
exports.fetch = fetch;
const fetchAll = async () => {
    try {
        return await user_1.default.find({});
    }
    catch (error) {
        throw error;
    }
};
exports.fetchAll = fetchAll;
//# sourceMappingURL=user.js.map