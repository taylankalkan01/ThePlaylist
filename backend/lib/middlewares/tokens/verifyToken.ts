import jwt, {Secret, JwtPayload } from "jsonwebtoken"
import { Request, Response, NextFunction } from "express";
import config from "config";

export interface CustomRequest extends Request {
    token: string | JwtPayload;
  }

export const verifyUserToken =async (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.userJWT
    const key = config.get<Secret>("ACCESS_TOKEN_USER_PRIVATE_KEY") || "";
    let user
    try {
        if (!token) {
            return res.status(403).json({error:true,message:"Invalid Auth user token(req.cookies.userJWT) "})
        }

        user = jwt.verify(token,key);
        (req as CustomRequest).token = user;

        next();
        
    } catch (error) {
        res.status(500).json({ error: true, message: error });
    }
}
export const verifyAdminToken =async (req:Request, res:Response, next:NextFunction) => {
    const token = req.cookies.adminJWT
    const key = config.get<Secret>("ACCESS_TOKEN_ADMIN_PRIVATE_KEY") || "";
    let admin
    try {
        if (!token) {
            return res.status(403).json({error:true,message:"Invalid Auth admin token(req.cookies.adminJWT) "})
        }

        admin = jwt.verify(token,key);
        (req as CustomRequest).token = admin;

        next();
        
    } catch (error) {
        res.status(500).json({ error: true, message: error });
    }
}