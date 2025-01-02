"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchUsers = exports.fetchUserDetails = exports.loginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/generateToken");
const createUser = async (req, res) => {
    try {
        const userData = { ...req.body };
        const result = await (0, user_1.create)(userData);
        if (result) {
            res.status(201).send({ msg: "user created", status: 1 });
            return;
        }
        res.status(400).send({ msg: "user already exists", status: 0 });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Error creating user", status: 0 });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await (0, user_1.fetch)(email);
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (user && isValidPassword) {
            res.status(200).send({
                id: user._id,
                email: user.email,
                token: (0, generateToken_1.generateToken)(user._id, email),
                status: 1,
            });
        }
        else {
            res.status(401).send({ msg: "Invalid email or password", status: 0 });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ msg: "Error logining user", status: 0 });
    }
};
exports.loginUser = loginUser;
const fetchUserDetails = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await (0, user_1.fetch)(email);
        res.status(200).send({
            email: user.email,
            image: user.image,
            name: user.name,
            status: 1,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ msg: "Error getting user details", status: 0 });
    }
};
exports.fetchUserDetails = fetchUserDetails;
const fetchUsers = async (req, res) => {
    try {
        const users = await (0, user_1.fetchAll)();
        res.status(200).send({
            data: users,
            status: 1,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ msg: "Error getting user details", status: 0 });
    }
};
exports.fetchUsers = fetchUsers;
//# sourceMappingURL=user.js.map