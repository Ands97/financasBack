import {Request, Response, NextFunction} from 'express';
import User from '../models/userModel';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

export const Auth = {
    private: async(req: Request, res: Response, next: NextFunction) =>{
        let sucess = false;

        if(req.headers.authorization){

            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === "Bearer"){

                try {
                    JWT.verify(
                        token, 
                        process.env.JWT_SECRET_KEY as string
                    );
                    sucess = true 
                } catch (error) {
                    res.status(403)
                        .json({error:'Não autorizado!'})
                }
                
            }

        }
        if(sucess){
            next()
        }else{
            res.status(403)
                .json({error:'Não autorizado!'})
        }
    }
}