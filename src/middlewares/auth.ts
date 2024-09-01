import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let token: string | undefined = req.headers.authorization;

        if(!token){
            res.status(401).json({message: "Not Authorized"})
        }else{
            //token = token.replace("Bearer ", "");
            let filtered = token.replace("Bearer ", "");

            const decoded: any = jwt.verify(filtered, process.env.JWT_SECRET || "secret")
            //para utilizar con el next
            req.body.loggedUser = decoded;
            req.params.id = decoded.user_id;
            next();

        }

        
    }catch(error){
        if(error instanceof TokenExpiredError){
            res.status(401).json({message: "Token expired", error})
        }else{
            res.status(401).json({message: "Token invalid", error})
        }
    }
}

export default auth;