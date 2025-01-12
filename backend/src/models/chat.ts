import { ChatData, IChat } from "../interfaces/chat";
import Chat from "../schemas/chat";

export const create = async (data: ChatData): Promise<IChat | undefined> => {
  const { users: userData } = data;

  try {
    if (!userData.length) {
      return;
    }

    return await Chat.create({
      users: userData,
    });
  } catch (error) {
    throw error;
  }
};

export const fetch = async (
  emailA: string,
  emailB: string
): Promise<IChat | undefined> => {
  try {
    return await Chat.findOne({
      $and: [
        { users: { $elemMatch: { email: emailA } } },
        { users: { $elemMatch: { email: emailB } } },
      ],
    });
  } catch (error) {
    throw error;
  }
};
