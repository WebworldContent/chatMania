import { Iuser, UserData } from "../interfaces/user";
import User from "../schemas/user";
import bcrypt from "bcrypt";

export const create = async (data: UserData): Promise<Iuser | undefined> => {
  const { name, email, password } = data;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    throw error;
  }
};

export const fetch = async (email: string | undefined): Promise<UserData> => {
  if (!email) {
    return;
  }

  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
};

export const fetchAll = async (): Promise<Array<UserData>> => {
  try {
    return await User.find({})
  } catch (error) {
    throw error;
  }
};