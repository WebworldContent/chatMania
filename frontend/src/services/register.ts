import axios from "axios";
import { SuccessData, UserData } from "../interfaces";

export const createUser = async (userData: UserData): Promise<SuccessData> => {
  try {
    const { data } = await axios.post(`http://localhost:5000/register`, {
      ...userData,
    }, {withCredentials: true});

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
