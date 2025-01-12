import axios, { AxiosError } from "axios";
import { ChatData, SuccessData, UserChatData } from "../interfaces";

const customError = (name: string, error: Error): Error => {
  const customError = error;
  customError.name = name;
  return error;
};

export const createChat = async (
  userData: UserChatData
): Promise<SuccessData | undefined> => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/message",
      {
        ...userData,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchChat = async (email: string | null): Promise<ChatData> => {
  if (!email) {
    throw customError("NoEmail", new Error("Email does not exists"));
  }

  try {
    const { data } = await axios.get(`http://localhost:5000/message/${email}`, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.error("Unexpected error:", error);

    if (error instanceof AxiosError && error.status === 404) {
      throw customError("NoData", new Error(`Error occured: ${error}`));
    }
    throw error;
  }
};
