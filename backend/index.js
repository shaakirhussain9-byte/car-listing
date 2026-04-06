import express from "express"
import dotenv, { config } from "dotenv";
import connectDB from "./Confige/db.js"
import UserRouter from "./routes/User.router.js";
import authRouter from './routes/Auth.router.js'
dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/users',UserRouter);
app.use('/api/auth',authRouter)

const PORT = process.env.PORT || 3000;
app.listen(3000, ()=> {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});
