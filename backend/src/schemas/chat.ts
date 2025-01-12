import { Schema, model } from "mongoose";
import { IChat } from "../interfaces/chat";

const chatSchema = new Schema<IChat>(
  {
    groupChat: { type: Boolean, default: false },
    users: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        messages: [{ type: String }],
      },
    ],
    chatName: { type: String, default: "personel" },
  },
  { timestamps: true }
);

const Chat = model<IChat>("chat", chatSchema);

export default Chat;
