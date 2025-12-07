import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return async(req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized access"
        })
      }

      // Verify token
      const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

      req.user = decoded;


      if (!roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden access"
        })
      }
      next();
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}


export default auth;