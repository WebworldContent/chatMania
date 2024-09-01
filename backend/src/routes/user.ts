import { Router } from "express";
import { createUser, fetchUserDetails, loginUser } from "../controllers/user";
import { handleValidationError, validateLogin, validateRegister } from "../middleware/validator";
import { protect } from "../middleware/protect";

const userRoute = Router();

userRoute.post('/register', validateRegister, handleValidationError, createUser);
userRoute.post('/login', validateLogin, handleValidationError, loginUser);
userRoute.get('/user/:email', protect, fetchUserDetails);

export default userRoute;
