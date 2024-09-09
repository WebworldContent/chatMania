import { Request, Response } from "express";
import { create, fetch, fetchAll } from "../models/user";
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
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user && isValidPassword) {
      res.status(200).send({
        id: user._id,
        email: user.email,
        token: generateToken(user._id, email),
        status: 1,
      });
    } else {
      res.status(401).send({ msg: "Invalid email or password", status: 0 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error logining user", status: 0 });
  }
};

export const fetchUserDetails = async (req: Request, res: Response) => {
  const { email } = req.params;
  try {
    const user: UserData = await fetch(email);
    res.status(200).send({
      email: user.email,
      image: user.image,
      name: user.name,
      status: 1,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Error getting user details", status: 0 });
  }
};

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const users: UserData[] = await fetchAll();
    res.status(200).send({
      data: users,
      status: 1,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Error getting user details", status: 0 });
  }
};
