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
      res.status(404).json({ msg: 'User not found', status: 0 });
      throw new Error("User not found");
    }

    req.body.user = user;

    next();
  } catch (error) {
    console.error("Error caught: ", error.message);

    if (error instanceof Error) {
      switch(error.message){
        case 'No token':
          res.status(406).json({ msg: error.message, status: 0 });
          break;
        default:
          res.status(500).json({ msg: 'An unexpected error occured', status: 0 });
          break;
      }
      return;
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(403)
        .json({ msg: "Token expired, please login again" });
    }

    res.status(401).json({ msg: "Not authorized, token failed" });
  }
};
