import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const generateToken = (id: string, email: string) => {
  return sign({id, email}, JWT_SECRET as string, {
    expiresIn: "5h",
  });
};