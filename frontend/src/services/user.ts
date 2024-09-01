import axios from "axios";
import { UserData } from "../interfaces";

export const fetchUser = async (email: string, token: string): Promise<UserData> => {
  if (!email || !token) {
    throw new Error("Email and token must be provided.");
  }

  try {
    const { data } = await axios.get(`http://localhost:5000/user/${email}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return data;
  } catch (error) {
    // Log the error and return a more descriptive message
    console.error('Error fetching user:', error);
    throw error; // or return a specific error object
  }
};