import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import userRoute from './routes/user';
import { dbConnect } from './dbConfig';
import helmet from 'helmet';
import { PORT } from './config';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser'

const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});
dbConnect();

app.use(express.json());
app.use(cookieParser()); // parse cookie
app.use(helmet()); // Add security to headers
app.use(cors({
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

app.use(userRoute);

server.listen(PORT, () => {console.log(`Running on port : ${PORT}`)});
