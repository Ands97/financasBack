import { IAccount } from "../app/interfaces/models/IAccount";
import { IAccountRepository } from "../app/interfaces/repositories/IAccountRepository";
import AccountModel from "../models/AccountModel";
import Logger from "../utils/Logger";

class AccountRepository implements IAccountRepository {
  public async setAccount(account: string, uid: string): Promise<boolean> {
    try {
      await AccountModel.create({
        account: account,
        userId: uid,
      });

      return true;
    } catch (error) {
      Logger.error(
        "[AccountRepository] SetAccount > ERRO_AO_SALVAR_CONTA",
        error
      );
    }
  }

  public async getAccounts(uid: string): Promise<IAccount[]> {
    try {
      const accounts = await AccountModel.find({ userId: uid });

      if (!accounts.length) {
        return;
      }

      return accounts;
    } catch (error) {
      Logger.error(
        "[AccountRepository] GetAccounts > ERRO_AO_RECUPERAR_CONTA",
        error
      );
    }
  }

  public async getAccountById(accountId: string): Promise<string> {
    try {
      const { account } = await AccountModel.findById({ _id: accountId });

      if (!account) {
        return;
      }

      return account;
    } catch (error) {
      Logger.error(
        "[AccountRepository] GetAccounts > ERRO_AO_RECUPERAR_CONTA",
        error
      );
    }
  }
}

export default AccountRepository;
