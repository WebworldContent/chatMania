import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

// Helper function to verify token asynchronously
export const verifyToken = (token: string): Promise<any> => {
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
