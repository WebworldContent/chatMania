"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const dbConnect = async () => {
    try {
        await mongoose_1.default.connect(config_1.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("mongodb connection established");
    }
    catch (error) {
        throw new Error(`Error connecting to mongodb ${error}`);
    }
};
exports.dbConnect = dbConnect;
// Handle termination signals to close the connection
const gracefulShutdown = (msg, callback) => {
    mongoose_1.default.connection.close();
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
//# sourceMappingURL=dbConfig.js.map