import mongoose from "mongoose";
import { MONGO_URI } from "./config";

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("mongodb connection established");
  } catch (error) {
    throw new Error(`Error connecting to mongodb ${error}`);
  }
};

// Handle termination signals to close the connection
const gracefulShutdown = (msg: string, callback: () => void): void => {
  mongoose.connection.close();
  callback();
};

// For nodemon restarts
process.once("SIGUSR2", () => {
  gracefulShutdown("nodemon restart", () => {
    process.kill(process.pid, "SIGUSR2");
  });
});

// For app termination
process.on("SIGINT", () => {
  gracefulShutdown("app termination", () => {
    process.exit(0);
  });
});

export { dbConnect };
