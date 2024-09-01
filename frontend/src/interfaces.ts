export interface UserData {
  name: string;
  email: string;
  password?: string;
  image: string;
  repeatPassword?: string
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