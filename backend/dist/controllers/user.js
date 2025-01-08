"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.fetchUsers = exports.fetchUserDetails = exports.loginUser = exports.createUser = void 0;
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
            res.status(200).cookie('token', (0, generateToken_1.generateToken)(user._id, email), {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            }).send({
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
    const email = req.params.email || req.body?.user?.email;
    try {
        if (!email) {
            throw new Error('Email is required');
        }
        const user = await (0, user_1.fetch)(email);
        if (!user) {
            throw new Error('User not found');
        }
        res.status(200).send({
            email: user.email,
            image: user.image,
            name: user.name,
            status: 1,
        });
    }
    catch (error) {
        console.log(error.message);
        if (error instanceof Error) {
            switch (error.message) {
                case 'Email is required':
                    res.status(405).send({ msg: error.message, status: 0 });
                    break;
                case 'User not found':
                    res.status(404).send({ msg: error.message, status: 0 });
                    break;
                default:
                    res.status(500).send({ msg: 'An unexpected error occured', status: 0 });
                    break;
            }
        }
        else {
            res.status(500).send({ msg: "Error getting user details", status: 0 });
        }
    }
};
exports.fetchUserDetails = fetchUserDetails;
const fetchUsers = async (req, res) => {
    try {
        const users = await (0, user_1.fetchAll)();
        const filteredUsers = users.filter(user => user.email !== req.body?.user?.email);
        res.status(200).send({
            data: filteredUsers,
            status: 1,
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ msg: "Error getting user details", status: 0 });
    }
};
exports.fetchUsers = fetchUsers;
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        }).status(200).send({ msg: "Logged out successfully", status: 1 });
    }
    catch (error) {
        res.status(502).send({ msg: "Error while logging out", status: 0 });
    }
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=user.js.map