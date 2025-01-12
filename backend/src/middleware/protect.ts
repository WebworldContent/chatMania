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
      throw new Error("No token");
    }

    const decoded = await verifyToken(token);

    const user = await User.findOne({ email: (decoded as any).email });

    if (!user) {
      throw new Error("User not found");
    }

    req.body.user = user;

    next();
  } catch (error) {
    console.error("Error caught:", error);
  
    if (error.name === "TokenExpiredError") {
      return res.status(402).json({ msg: "Token expired, please login again" });
    }

    if (error instanceof Error) {
      switch (error.message) {
        case 'No token':
          return res.status(406).json({ msg: error.message, status: 0 });
        case 'User not found':
          return res.status(404).json({ msg: "User not found", status: 0 });
        default:
          return res.status(500).json({ msg: 'An unexpected error occurred', status: 0 });
      }
    }

    return res.status(401).json({ msg: "Not authorized, token failed" });
  }
};
