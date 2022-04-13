import User from '../models/userModel';
import JWT from 'jsonwebtoken';
import {Request, Response} from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';

dotenv.config();


export const register = async(req: Request, res:Response)=>{
    if(req.body.email && req.body.password){
        let {name, email, password} = req.body;

        let hasUser = await User.findOne({ email });
        if(!hasUser){
            let newUser = await User.create({name, email, password: await bcrypt.hash(password, 10)});

            const token = JWT.sign(
                { id: newUser._id, name: newUser.name, email: newUser.email },
                process.env.JWT_SECRET_KEY as string
                )

            res.status(201).json({token, name})
            return;
        }else{
            res.json('Email já existe')
        }
        
    }
    res.json({error: 'Email e/ou senha não enviado!'})
       
}

export const login = async(req: Request, res: Response)=>{
    if(req.body.email && req.body.password){
        let {email, password} = req.body;
        let user = await User.findOne({ email });
        let username = user?.name;
        if(user){
            if(await bcrypt.compare(password, user.password)){
                const token = JWT.sign(
                    { id: user._id, name: user.name, email: user.email },
                    process.env.JWT_SECRET_KEY as string, 
                    {expiresIn: '24h'}
                )
                res.json({status: true, token, username})
                return;
            }
            
        }

    }
   res.json({status: false});
}