"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const dbConfig_1 = require("./dbConfig");
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const socket_io_1 = require("socket.io");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});
(0, dbConfig_1.dbConnect)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)()); // parse cookie
app.use((0, helmet_1.default)()); // Add security to headers
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    credentials: true
})); // allowing cors request
//socket connection
io.on('connection', (socket) => {
    console.log('connected to socket.io');
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit('connected');
    });
    socket.on('join room', (room) => {
        console.log('Joined room ', room);
    });
});
app.use(user_1.default);
server.listen(config_1.PORT, () => { console.log(`Running on port : ${config_1.PORT}`); });
//# sourceMappingURL=index.js.map