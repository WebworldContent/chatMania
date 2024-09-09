import { Router } from "express";
import { createUser, fetchUserDetails, loginUser, fetchUsers } from "../controllers/user";
import { handleValidationError, validateLogin, validateRegister } from "../middleware/validator";
import { protect } from "../middleware/protect";

const userRoute = Router();

userRoute.post('/register', validateRegister, handleValidationError, createUser);
userRoute.post('/login', validateLogin, handleValidationError, loginUser);
userRoute.get('/user/:email', protect, fetchUserDetails);
userRoute.get('/users', protect, fetchUsers);

export default userRoute;
