import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import notesRouter from './routes/notes.routes.js';
import loginRouter from './routes/login.routes.js'
import { connectDatabase } from './config/db.js';
import rateLimiter from './middlewares/rateLimiter.js';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
        credentials: true
    }));
}
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false}));
app.use(express.json());
app.use(rateLimiter);

app.use('/api/login', loginRouter);
app.use('/api/notes', notesRouter);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    
    app.get("/*splat", (_,res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    })
});
 
