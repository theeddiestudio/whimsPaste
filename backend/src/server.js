import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import notesRouter from './routes/notes.routes.js';
import loginRouter from './routes/login.routes.js'
import { connectDatabase } from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(express.json());
app.use(rateLimiter);

app.use('/login', loginRouter);
app.use('/api/notes', notesRouter);

connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    })
});
 
