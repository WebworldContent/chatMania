import { Request, Response } from "express";
import { create, fetch } from "../models/user";
import bcrypt from "bcrypt";
import { UserData } from "../interfaces/user";
import { generateToken } from "../utils/generateToken";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userData = { ...req.body };
    const result = await create(userData);
    if (result) {
      res.status(201).send({ msg: "user created", status: 1 });
      return;
    }
    res.status(400).send({ msg: "user already exists", status: 0 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error creating user", status: 0 });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: UserData = await fetch(email);

    console.log(user);

    const isValidPassword = await bcrypt.compare(password, user.password);

    console.log(isValidPassword);

    if (user && (isValidPassword)) {
      res
        .status(200)
        .send({ id: user._id, email: user.email, token: generateToken(user._id, email) });
    } else {
      res.status(401).send({ msg: "Invalid email or password", status: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error logining user", status: 0 });
  }
};
