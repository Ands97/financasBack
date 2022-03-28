import {Request, Response} from 'express';
import Account from '../models/accountModel';

export const create = async (req: Request, res: Response) => {
    try {
        const newAccount = await Account.create({account: req.body.title, userId: req.userId});
        res.status(201).json({newAccount})
    } catch (error) {
        res.json({error})
    }
};

export const getAccounts =async (req: Request, res: Response) => {
    try{
        const list = await Account.find({userId: req.userId});
        res.json(list)
    } catch (error) {
        res.json({error})
    }
};

export const getAccountId = async (req: Request, res: Response) => {
    try{
        const account = await Account.findById({_id: req.params.id});
        res.json(account)
    }catch(error){
        res.json({error})
    }
}

export const updateAccount = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;   
        const title = req.body.title;
        if(title){
            const update = await Account.updateOne(
                {_id: id},
                {account: title}
            )
            res.json({update})
        }else{
            res.json({error: 'Não recebemos o título a ser atualizado!'})
        }
        
    } catch (error) {
        res.status(404)
    }
};

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        if(id){
            const del = await Account.deleteOne({_id:id});
            res.status(200).json({message:'deleted'})
        }else{
            res.json({error: 'conta não encontrada!'})
        }

    } catch (error) {
        res.json({error})
    }
};
