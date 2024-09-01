import { Request, Response } from "express";
import { UserDocument, UserInput } from "../models/user.model";
import userService from "../services/user.service";
import {UserExistsError, NotAuthorizedError} from "../exceptions/";

class UserController {

    public async create(req: Request, res: Response){
        try{
            const user: UserDocument = await userService.create(req.body as UserInput);
            res.status(201).json(user);
        }catch(error){
            res.status(500).json(error)
            if(error instanceof UserExistsError){
                res.status(400).json({message: "User already exists"})
                return;
            }
            res.status(500).json(req.body)
        }
    }

    
    public async login(req: Request, res: Response){
        try{
            const userObj = await userService.login(req.body)
            res.status(200).json(userObj)
        }catch(error){
            if(error instanceof NotAuthorizedError){
                res.status(400).json({message: "nose nose"})
                return;
            }
            res.status(500).json(error)
        }
    }

    public async getAll(req: Request, res: Response){
        try{
            const users: UserDocument[] = await userService.findAll();
            return res.json(users);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async getUser(req: Request, res: Response){
        try{
            const user: UserDocument | null = await userService.findById(req.params.id);
            res.status(201).json(user);
            if(!user){
                res.status(404).json({error: "not found", message: "User not found"})
                return;
            }    
        }catch(error){
            res.status(500).json(error)
        }
    }

    public async update(req: Request, res: Response){
        try{
            const user: UserDocument | null = await userService.update(req.params.id, req.body as UserInput);
            res.status(201).json(user);

            if(!user){
                res.status(404).json({error: "not found", message: "User not found"})
                return;
            }
        }catch(error){

            if(error instanceof UserExistsError){
                res.status(400).json({message: "user already exists"})
            }

            res.status(500).json(error)
        }
    }

    public async delete(req: Request, res: Response){
        try{
            const user: UserDocument | null = await userService.delete(req.params.id);
            res.status(201).json(user);

            if(!user)
                res.status(404).json({error: "not found", message: "User not found"})

        }catch(error){
            res.status(500).json(error)
        }
    }


}

export default new UserController();