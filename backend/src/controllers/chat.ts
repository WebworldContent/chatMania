import { Request, Response } from "express";
import { create, fetch } from "../models/chat";
import { ChatData } from "../interfaces/chat";

export const createChat = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const chatData = { ...req.body };
    const {
      email: selectedEmail,
      name: selectedName,
      message: selectedMessage,
      user: { email, name },
    } = chatData;

    console.log(chatData);

    const userData: ChatData = {
      users: [
        { email: selectedEmail, name: selectedName, messages: selectedMessage },
        { email, name, messages: [] },
      ],
    };
    await create(userData);
    res.status(201).send({ msg: "Chat created", status: 1 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error creating chat", status: 0 });
  }
};

export const getChats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email: emailA } = req.params;
    const { email: emailB } = req.body?.user?.email || "";

    const response = await fetch(emailA, emailB);
    console.log(response);
    if (!response) {
      res.status(404).send({ msg: "Chat data not found", status: 0 });
      return;
    }

    console.log(response);

    res.status(200).send({
      ...response,
      status: 1,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error", status: 0 });
  }
};
