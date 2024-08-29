import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../schemas/user";
import { JWT_SECRET } from "../config";

interface AuthUser extends Request {
  user?: any;
}

export const protect = async (
  req: AuthUser,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      const decode = verify(token, JWT_SECRET as string);

      req.user = User.findOne({ email: (decode as any).email });

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
