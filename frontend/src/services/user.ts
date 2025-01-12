import axios from "axios";
import { Logout, UserData } from "../interfaces";

const customError = (name: string, error: Error): Error => {
  const customError = error;
  customError.name = name;
  return error;
};

export const fetchUser = async (): Promise<UserData> => {
  try {
    const { data } = await axios.get(`http://localhost:5000/user`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && (error.response.status === 402 || error.response.status === 401)) {
        throw customError('TokenExpired', new Error("Token expired"));
      } else if (error.response && error.response.status === 406) {
        throw customError('NoToken', new Error("No Token"));
      } else {
        console.error("Error fetching user:", error.message);
        throw customError('NoUserFetched', new Error("Error fetching user"));
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const fetchAllUsers = async (): Promise<Array<UserData> | null> => {
  try {
    const { data: { data } } = await axios.get(`http://localhost:5000/users`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && (error.response.status === 402 || error.response.status === 401)) {
        throw customError('TokenExpired', new Error("Token expired"));
      } else if (error.response && error.response.status === 406) {
        throw customError('NoToken', new Error("No Token"));
      } else {
        console.error("Error fetching all users:", error.message);
        throw customError('NoUserFetched', new Error("Error fetching user"));
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const logoutUser = async (): Promise<Logout> => {
  const { data } = await axios.get('http://localhost:5000/logout', {withCredentials: true});
  return data;
}; 
