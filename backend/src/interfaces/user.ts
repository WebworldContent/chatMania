import { Document } from "mongoose";

export interface UserData {
  _id?: string;
  name: string;
  email: string;
  password: string;
  image: string;
};

export interface Iuser extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
}
