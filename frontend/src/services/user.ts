import axios from "axios";
import { UserData } from "../interfaces";

export const fetchUser = async (
  email: string,
  token: string
): Promise<UserData> => {
  if (!email || !token) {
    throw new Error("Email and token must be provided.");
  }

  try {
    const { data } = await axios.get(`http://localhost:5000/user/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const fetchAllUsers = async (token: string): Promise<Array<UserData>> => {
  try {
    const { data: { data } } = await axios.get(`http://localhost:5000/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
        console.error("Error fetching all users:", error.message);
        throw new Error("Error fetching all users");
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error");
    }
  }
};
