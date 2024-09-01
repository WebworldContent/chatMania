import axios from "axios";
import { LoginUser, SignData } from "../interfaces";

export const signInUser = async (userData: LoginUser): Promise<SignData> => {
  try {
    const { data } = await axios.post(`http://localhost:5000/login`, {
      ...userData,
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
