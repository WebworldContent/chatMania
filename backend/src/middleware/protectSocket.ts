import { ExtendedError, Socket } from "socket.io";
import { verifyToken } from "./verifyToken";
import User from "../schemas/user";
import { parse } from "cookie"; 

export const protectSocket = async (
  socket: Socket,
  next: (err?: ExtendedError) => void
) => {
  try {
    const cookieToken = socket.handshake?.headers?.cookie;
    if (!cookieToken) {
      throw new Error("No cookie token");
    }

    const { token } = parse(cookieToken);

    if (!token) {
      throw new Error("No token found in cookies");
    }

    const decoded = await verifyToken(token);

    const user = await User.findOne({ email: (decoded as any).email });

    if (!user) {
      throw new Error("User not found");
    }

    socket.data.user = user;

    next();
  } catch (error: any) {
    console.error("Socket authentication error:", error.message);
    next(new Error("Authentication failed"));
  }
};
