import { Router } from "express";
import { createUser, loginUser } from "../controllers/user";
import { handleValidationError, validateLogin, validateRegister } from "../middleware/validator";

const userRoute = Router();

userRoute.post('/register', validateRegister, handleValidationError, createUser);
userRoute.post('/login', validateLogin, handleValidationError, loginUser);

export default userRoute;
