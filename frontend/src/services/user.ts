import axios from "axios";
import { UserData } from "../interfaces";

export const fetchUser = async (
  email: string | null,
): Promise<UserData> => {
  if (!email) {
    throw new Error("Email must be provided.");
  }

  try {
    const { data } = await axios.get(`http://localhost:5000/user/${email}`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 402) {
        throw new Error("Token expired");
      } else {
        console.error("Error fetching user:", error.message);
        throw new Error("Error fetching user");
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
        throw new Error("Token expired");
      } else {
        console.error("Error fetching all users:", error.message);
        throw new Error("Error fetching all users");
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};

export const logoutUser = async (): Promise<void> => {
  await axios.get('http://localhost:5000/logout');
}; 
