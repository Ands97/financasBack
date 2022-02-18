import {Request, Response} from 'express';
import Transaction from '../models/transactionModel';

export const create = async (req: Request, res: Response)=>{
    try {
        const { type, description, value, date, status} = req.body;

        const dateReceived = new Date(date);
        const month = String(dateReceived.getMonth());
        const year = String(dateReceived.getFullYear());
        const day = String(dateReceived.getDate());

        const newTransaction = await Transaction.create({
            transactionType: type,
            transactionDescription: description,
            transactionValue: value,
            transactionDay: day,
            transactionMonth: month,
            transactionYear: year,
            transactionStatus: status,
            userId: req.userId
        })
        res.status(201).json({newTransaction})
    } catch (error) {
        res.status(403).send(error)
    }
}

export const getStatement = async (req: Request, res: Response)=>{
    try{
        const list = await Transaction.find({userId: req.userId,
            transactionStatus: true}).sort({transactionDate: -1})
        res.json(list)
    }catch(err){
        res.status(404)
    }
}

export const getStatementForMonth = async (req: Request, res: Response) =>{
    const date = new Date(req.params.date)
    if(date){
        const month = String(date.getMonth())
        const year = String(date.getFullYear())

        try {
            const statementForMonth = await Transaction.find({transactionMonth: month,
                transactionYear: year
            })
            res.json({statementForMonth})
        } catch (error) {
            res.status(404)
        }
      
    }

}

const isOwner = (user: any, list: any) => {
    if(JSON.stringify(user._id) === JSON.stringify(list.userId)){
        return true;
    }   
    else{
        return false; 
    }
}