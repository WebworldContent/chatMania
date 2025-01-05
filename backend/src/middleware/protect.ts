import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import User from "../schemas/user";
import { JWT_SECRET } from "../config";

interface AuthUser extends Request {
  user?: any;
}

// Helper function to verify token asynchronously
const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    verify(token.trim(), JWT_SECRET as string, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const protect = async (
  req: AuthUser,
  res: Response,
  next: NextFunction
) => {
  const {
    cookies : { token = '' }
  } = req;

  try {
    if (!token) {
      res.status(401);
      throw new Error("No authorization token");
    }

    const decoded = await verifyToken(token);

    const user = await User.findOne({ email: (decoded as any).email });

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    req.body.user = user;

    next();
  } catch (error) {
    console.error(error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(402)
        .json({ message: "Token expired, please login again" });
    }
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
