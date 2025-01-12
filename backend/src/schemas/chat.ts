import { Schema, model } from "mongoose";
import { IChat } from "../interfaces/chat";

const chatSchema = new Schema<IChat>(
  {
    groupChat: { type: Boolean, default: false },
    users: [
      {
        name: { type: String },
        email: { type: String },
        messages: [{ type: String }],
      },
    ],
    chatName: { type: String, default: "personel" },
  },
  { timestamps: true }
);

const Chat = model<IChat>("chats", chatSchema);

export default Chat;
