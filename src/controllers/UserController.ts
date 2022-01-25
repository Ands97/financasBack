import User from '../models/userModel';
import JWT from 'jsonwebtoken';
import {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const users = async (req: Request, res: Response)=>{
    try {
        let users = await User.find({});
        res.json(users)
    } catch (error) {
        res.json({message: error})
    }
};

export const register = async(req: Request, res:Response)=>{
    if(req.body.email && req.body.password){
        let {name, email, password} = req.body;

        let hasUser = await User.findOne({ email });
        if(!hasUser){
            let newUser = await User.create({name, email, password});

            const token = JWT.sign(
                { id: newUser._id, name: newUser.name, email: newUser.email },
                process.env.JWT_SECRET_KEY as string
                )

            res.status(201).json({id: newUser._id, token})
        }else{
            res.json('Email já existe')
        }
        
    }
    res.json({error: 'Email e/ou senha não enviado!'})
       
}

export const login = async(req: Request, res: Response)=>{
    if(req.body.email && req.body.password){
        let {email, password} = req.body;
        let user = await User.findOne({ email, password});

        if(user){
            const token = JWT.sign(
                { id: user._id, name: user.name, email: user.email },
                process.env.JWT_SECRET_KEY as string
            )
            res.json({status: true, token})
            return;
        }

    }
   res.json({status: false});
}