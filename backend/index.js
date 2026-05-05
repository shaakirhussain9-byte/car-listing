import express from "express"
import dotenv, { config } from "dotenv";
import connectDB from "./Confige/db.js"
import UserRouter from "./routes/user.router.js";
import authRouter from './routes/Auth.router.js';
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.router.js";
import path from 'path'
dotenv.config();
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use('/api/user',UserRouter);
app.use('/api/auth',authRouter)
app.use("/api/listing", listingRouter);


const PORT = process.env.PORT || 3000;
app.listen(3000, ()=> {
    connectDB();
    console.log(`server is running on port ${PORT}`);
});


const __dirname = path.resolve()
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname, "/forntend/dist")))
  app.get(/.*/, (req,res)=>{
    res.sendFile(path.resolve(__dirname, "forntend", "dist", "index.html"))
  })
}
// widdleware used to handle possible errors

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});