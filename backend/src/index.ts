import express from 'express';
import cors from 'cors';
import userRoute from './routes/user';
import { dbConnect } from './dbConfig';
import helmet from 'helmet';
import { PORT } from './config';

const app = express();
dbConnect();

app.use(express.json());
app.use(helmet()); // Add security to headers
app.use(cors()); // allowing cors request

app.use(userRoute);

app.listen(PORT, () => {console.log(`Running on port : ${PORT}`)});
