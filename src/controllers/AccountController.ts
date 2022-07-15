import {Request, Response} from 'express';
import { IAccount } from '../app/interfaces/models/IAccount';
import Account from '../models/accountModel';


class AccountController {
    public async createAccount(req: Request, res: Response): Promise<Response>{
        try {
            const accountInfo = req.body;
            if(accountInfo.lenght = 0){
                throw new Error("Não podemos realizar a operação devido a falta de informações");
            }

            const newAccount: IAccount = await Account.create({
                account: accountInfo.title,
                userId: accountInfo.userId
            })

            return res.status(201).json(newAccount)
                
        } catch (error) {
            return res.json(error).status(500);
        }
    }

    public async getAccounts(req: Request, res: Response): Promise<Response>{
        try {
            const { userId } = req.body;
            const accounts = await Account.find({userId});
            return res.status(200).json(accounts)
        } catch (error) {
            return res.json(error).status(500);
        }
    }

    public async getAccountId(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params;
            const account = await Account.findById({_id: id});

            if(!account){
                throw new Error("Informação não encontrada");
            }

            return res.json(account)
        } catch (error) {
            return res.json(error).status(500)
        }
    }

    public async updateAccount(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params;
            const { title } = req.body;

            const account = await Account.updateOne(
                {_id: id},
                {account: title}
            )

            if(!account){
                throw new Error("Não recebemos o título a ser atualizado!");
            }

            return res.json(account)
        } catch (error) {
            return res.json(error).status(500)
        }
    }

    public async deleteAccount(req: Request, res: Response): Promise<Response>{
        try {
            const { id } = req.params;
            await Account.deleteOne({_id: id});
            return res.json({message: 'deleted'});
        } catch (error) {
            return res.json(error).status(500)
        }
    }

}

export default new AccountController();