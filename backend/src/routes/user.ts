import { Router } from "express";
import { createUser, fetchUserDetails, loginUser, fetchUsers, logoutUser } from "../controllers/user";
import { handleValidationError, validateLogin, validateRegister } from "../middleware/validator";
import { protect } from "../middleware/protect";

const userRoute = Router();

userRoute.post('/register', validateRegister, handleValidationError, createUser);
userRoute.post('/login', validateLogin, handleValidationError, loginUser);
userRoute.get('/user', protect, fetchUserDetails);
userRoute.get('/users', protect, fetchUsers);
userRoute.get('/logout', protect, logoutUser);

export default userRoute;
