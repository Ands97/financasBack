import {Request, Response} from 'express';
import Transaction from '../models/transactionModel';

export const create = async (req: Request, res: Response)=>{
    try {
        const { type, description, value, date, paymentDate, Tstatus, category, account} = req.body;
        

        const newTransaction = await Transaction.create({
            transactionType: type,
            transactionDescription: description,
            transactionValue: value,
            transactionDate: date,
            transactionPaymentDate: paymentDate,
            transactionStatus: Tstatus,
            transactionCategory: category,
            transactionAccount: account,
            userId: req.userId
        })
        res.status(201).json({newTransaction})
    } catch (error) {
        res.status(403).send(error);
        
    }
}

export const getStatementResume = async (req: Request, res: Response)=>{
    try{
        const list = await Transaction.find({userId: req.userId,
            transactionStatus: true}).limit(5).sort({transactionPaymentDate: -1})
        res.json(list)
    }catch(err){
        res.status(404)
    }
}

export const getIcome = async (req: Request, res: Response)=>{
    try {
        const list = await Transaction.find({
            userId: req.userId,
            transactionStatus: true, 
            transactionType: true});
        const income = list.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
        res.json(income)
    } catch (error) {
        res.status(404).json(error)
    }
    
}

export const getExpense = async (req: Request, res: Response) => {
    try {
        const list = await Transaction.find({
            userId: req.userId,
            transactionStatus: true, 
            transactionType: false});
        const expense = list.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
        res.json(expense)
    } catch (error) {
        res.status(404).json(error)
    }
}

export const getStatementForMonth = async (req: Request, res: Response) =>{
    const date = new Date(req.body.date)
    if(date){
        try {
            const statementForMonth = await Transaction.find({transactionPaymentDate: date})
            res.json({statementForMonth})
        } catch (error) {
            res.status(404)
        }
    }else{
        res.json({})
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