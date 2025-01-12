import { Router } from "express";
import { createChat, getChats } from "../controllers/chat";
// import { handleValidationError, validateMessage } from "../middleware/validator";
import { protect } from "../middleware/protect";

const chatRoute = Router();

chatRoute.post('/message', protect, createChat);
chatRoute.get('/message/:email', protect, getChats);

export default chatRoute;
