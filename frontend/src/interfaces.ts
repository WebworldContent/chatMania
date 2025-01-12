export interface UserData {
  name: string;
  email: string;
  password?: string;
  image: string;
  repeatPassword?: string
}

export interface SuccessData {
  msg: string,
  status: number
}

export interface MessageData {
  email: string;
  name: string;
  message: string;
}

export interface UserChatData {
  email: string;
  name: string;
  messages: string[];
}

export interface ChatData {
  groupChat: boolean;
  users: UserChatData[];
  chatName: string;
  _id?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface SignData {
  token: string;
  status: number;
  id: string;
  email: string;
}

export interface Logout {
  msg: string;
  status: number;
}