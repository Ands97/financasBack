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
};

export const getStatementResume = async (req: Request, res: Response)=>{
    try{
        const list = await Transaction.find({userId: req.userId,
            transactionStatus: true}).limit(5).sort({transactionPaymentDate: -1})
        res.json(list)
    }catch(err){
        res.status(404)
    }
};

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
    
};

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
};

export const getStatementForMonth = async (req: Request, res: Response) =>{

    const date = req.body.date;
    const firstDate = `${date}-01`;
    const lastDate = `${date}-31`;
    const {account, category} = req.body;

    if(category === 'Todas as Categorias' && account !== 'Todas as Contas'){
        if(date && account){
            try {
                const statementForMonth = await Transaction.find({
                    userId: req.userId, 
                    transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                    transactionAccount: account
                })
                res.json(statementForMonth);
            } catch (error) {
                res.status(404).json(error)
            }
        }
    }else if(account === 'Todas as Contas' && category !== 'Todas as Categorias'){
        if(date && category){
            try {
                const statementForMonth = await Transaction.find({
                    userId: req.userId, 
                    transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                    transactionCategory: category
                })
                res.json(statementForMonth)
            } catch (error) {
                res.status(404).json(error)
            }
        }
    }else if(account === 'Todas as Contas' && category === 'Todas as Categorias'){
        try {
            const statementForMonth = await Transaction.find({
                userId: req.userId, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
            })
            res.json(statementForMonth)
        } catch (error) {
            res.status(404).json(error)
        }
    }
    else{
        try {
            const statementForMonth = await Transaction.find({
                useId: req.userId,
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionAccount: account,
                transactionCategory: category
            })
            res.json(statementForMonth)
        } catch (error) {
            res.status(404).json(error)
        }
    }
};

export const getIncomeForMonth = async (req: Request, res: Response) => {
    const date = req.body.date;
    const firstDate = `${date}-01`;
    const lastDate = `${date}-31`;
    const {account, category} = req.body;
    if(category === 'Todas as Categorias' && account !== 'Todas as Contas'){
        try {
            const list = await Transaction.find({
                userId: req.userId,
                transactionStatus: true, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionType: true,
                transactionAccount: account
            });
            
            const income = list.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
            res.json(income)
            console.log(income)
            
        } catch (error) {
            res.status(404).json(error)
        }
    }else if(account === 'Todas as Contas' && category !== 'Todas as Categorias'){
        try {
            const listIncome = await Transaction.find({
                userId: req.userId,
                transactionStatus: true, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionType: true,
                transactionCategory: category
            });
            const listExpense = await Transaction.find({
                userId: req.userId,
                transactionStatus: true, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionType: false,
                transactionCategory: category
            });
            let income = listIncome.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
            let expense = listExpense.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
            res.json({income, expense})
        } catch (error) {
            res.json(error)
        }
    }else if(account === 'Todas as Contas' && category === 'Todas as Categorias'){
        try {
            const list = await Transaction.find({
                userId: req.userId,
                transactionStatus: true, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionType: true,
            });
            const income = list.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
            res.json(income)
        } catch (error) {
            res.status(404).json(error)
        }
    }else{
        try {
            const list = await Transaction.find({
                userId: req.userId,
                transactionStatus: true, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionType: true,
                transactionAccount: account,
                transactionCategory: category
            });
            const income = list.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
            res.json(income)
        } catch (error) {
            res.status(404).json(error)
        }
    }
    
};

//Expense

export const getExpenseForMonth = async (req: Request, res: Response) => {
    const date = req.body.date;
    const firstDate = `${date}-01`;
    const lastDate = `${date}-31`;
    const {account, category} = req.body;
    if(category === 'Todas as Categorias' && account !== 'Todas as Contas'){
        try {
            const list = await Transaction.find({
                userId: req.userId,
                transactionStatus: true, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionType: false,
                transactionAccount: account
            });
            const expense = list.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
            if(expense){
                res.json(expense)
            }else{
                res.json(0)
            }
        } catch (error) {
            res.status(404).json(error)
        }
    }else if(account === 'Todas as Contas' && category !== 'Todas as Categorias'){
        try {
            const list = await Transaction.find({
                userId: req.userId,
                transactionStatus: true, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionType: false,
                transactionCategory: category
            });
            const expense = list.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
            if(expense){
                res.json(expense)
            }else{
                res.json('0,00')
            }
        } catch (error) {
            res.status(404).json(error)
        }
    }else if(account === 'Todas as Contas' && category === 'Todas as Categorias'){
        try {
            const list = await Transaction.find({
                userId: req.userId,
                transactionStatus: true, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionType: false,
            });
            const expense = list.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
            if(expense){
                res.json(expense)
            }else{
                res.json('0,00')
            }
        } catch (error) {
            res.status(404).json(error)
        }
    }else{
        try {
            const list = await Transaction.find({
                userId: req.userId,
                transactionStatus: true, 
                transactionPaymentDate: {$gte: firstDate, $lte: lastDate},
                transactionType: false,
                transactionAccount: account,
                transactionCategory: category
            });
            const expense = list.map((item)=>(item.transactionValue)).reduce((total, item)=> total += item)
            if(expense){
                res.json(expense)
            }else{
                res.json('0,00')
            }
            
        } catch (error) {
            res.status(404).json(error)
        }
    }
    
};