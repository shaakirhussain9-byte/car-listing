import jwt  from "jsonwebtoken"
import { errorHandler } from "./error.js";
export const verifyToken = (req,res, next)=>{
    const token = req.cookies.access._token
    if(!token)return next(errorHandler(401, "Unauthorized"));
    jwt.verify(Token,process.env.jwt_SECRET, (err,user)=>{
        if(err) return next(errorHandler(403, "forbioden"));
        req.user = user
        next();
    });

    
};
