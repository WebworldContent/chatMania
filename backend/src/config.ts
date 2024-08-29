import 'dotenv/config';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chatmania';
const JWT_SECRET = process.env.JWT_SECRET || 'xyzabc123'

export {PORT, MONGO_URI, JWT_SECRET}