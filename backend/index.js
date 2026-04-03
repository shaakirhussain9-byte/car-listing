import express from "express"
import dotenv, { config } from "dotenv";
import connectDB from "./Confige/db.js"
import UserRouter from "./routes/User.router.js";
dotenv.config();
const app = express();
app.use('/api/users',UserRouter);

const PORT = process.env.PORT || 3000;
app.listen(3000, ()=> {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});
