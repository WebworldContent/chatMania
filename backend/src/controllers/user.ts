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
      res.status(200).cookie('token', generateToken(user._id, email), {
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      }).send({
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

export const fetchUserDetails = async (req: Request, res: Response): Promise<void> => {
  const email = req.body?.user?.email;

  try {
    if (!email) {
      throw new Error('Email is required');
    }

    const user: UserData = await fetch(email);

    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).send({
      email: user.email,
      image: user.image,
      name: user.name,
      status: 1,
    });
  } catch (error) {
    console.log(error.message);

    if (error instanceof Error) {
      switch(error.message) {
        case 'Email is required':
          res.status(405).send({msg: error.message, status: 0});
          break;
        case 'User not found':
          res.status(404).send({msg: error.message, status: 0});
          break;
        default:
          res.status(500).send({msg: 'An unexpected error occured', status: 0});
          break;
      }
    } else {
      res.status(500).send({ msg: "Error getting user details", status: 0 });
    }
  }
};

export const fetchUsers = async (req: Request, res: Response) => {
  try {
    const users: UserData[] = await fetchAll();
    const filteredUsers = users.filter(user => user.email !== req.body?.user?.email);
    res.status(200).send({
      data: filteredUsers,
      status: 1,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ msg: "Error getting user details", status: 0 });
  }
};

export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    }).status(200).send({ msg: "Logged out successfully", status: 1 });
  } catch (error) {
    res.status(502).send({msg: "Error while logging out", status: 0});
  }
};