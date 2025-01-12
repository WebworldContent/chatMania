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

export const save = async (email: string, message: string) => {
  try {
    console.log(email, message);
    const chat = await Chat.findOneAndUpdate({'users.email': `${email}`}, {$push: {'users.$.messsages': `${message}`}}, { new: true });
    if (!chat) {
      throw new Error("Chat not found for the provided email");
    }

    console.log("Message saved successfully:", chat);
  } catch (error) {
    console.error("Error saving message:", error);
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
