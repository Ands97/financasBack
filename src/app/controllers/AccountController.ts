import { Request, Response } from "express";
import Account from "../../models/AccountModel";
import Logger from "../../utils/Logger";
import AccountFactory from "../../factories/AccountFactory";

class AccountController {
  public async createAccount(req: Request, res: Response): Promise<Response> {
    try {
      const { accountName, userId }: { accountName: string; userId: string } =
        req.body;

      if (!accountName) {
        Logger.error("[AccountController] createAccount > Info não enviada");
        return res.status(400);
      }

      const service = new AccountFactory().getService();

      const accountSaved = await service.setAccount({
        account: accountName,
        userId: userId,
      });

      if (!accountSaved) {
        Logger.error("[AccountController] createAccount > CONTA_DUPLICADA");
        return res.status(400);
      }

      return res.status(201);
    } catch (error) {
      return res.json(error).status(500);
    }
  }

  public async getAccounts(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.body;

      const service = new AccountFactory().getService();

      const accounts = await service.getAccounts(userId);

      if (!accounts) {
        Logger.error(
          "[AccountController] getAccounts > CONTAS_NAO_ENCONTRADAS"
        );
        res.status(404);
      }

      return res.status(200).json(accounts);
    } catch (error) {
      return res.json(error).status(500);
    }
  }

  public async getAccountId(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const service = new AccountFactory().getService();

      const account = await service.getAccountById(id);

      if (!account) {
        Logger.error("[AccountController] GetAccountId > CONTA_NAO_ENCONTRADA");
        res.status(404);
      }

      return res.json(account);
    } catch (error) {
      return res.json(error).status(500);
    }
  }

  public async updateAccount(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title } = req.body;

      const account = await Account.updateOne({ _id: id }, { account: title });

      if (!account) {
        throw new Error("Não recebemos o título a ser atualizado!");
      }

      return res.json(account);
    } catch (error) {
      return res.json(error).status(500);
    }
  }

  public async deleteAccount(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await Account.deleteOne({ _id: id });
      return res.json({ message: "deleted" });
    } catch (error) {
      return res.json(error).status(500);
    }
  }
}

export default new AccountController();
