"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validator_1 = require("../middleware/validator");
const userRoute = (0, express_1.Router)();
userRoute.post('/register', validator_1.validateRegister, validator_1.handleValidationError, user_1.createUser);
userRoute.post('/login', validator_1.validateLogin, validator_1.handleValidationError, user_1.loginUser);
exports.default = userRoute;
//# sourceMappingURL=user.js.map