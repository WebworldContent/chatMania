import { Document } from "mongoose";

export interface IChat extends Document{
    groupChat: boolean;
    users: [{name: string, email: string, messages: string[]}];
    chatName?: string;
}

export interface UserChatInfo {
    name: string;
    email: string;
    messages: string[];
}

export interface ChatData {
    users: Array<UserChatInfo>;
    chatName?: string;
}
