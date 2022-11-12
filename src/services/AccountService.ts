import { IAccount } from "../app/interfaces/models/IAccount";
import { IAccountRepository } from "../app/interfaces/repositories/IAccountRepository";
import { ICacheAccount } from "../app/interfaces/repositories/ICache";
import { IAccountService } from "../app/interfaces/services/IAccountService";
import Logger from "../utils/Logger";

class AccountService implements IAccountService {
  private readonly _cache: ICacheAccount;
  private readonly _accountRepo: IAccountRepository;

  constructor(cache: ICacheAccount, accountRepo: IAccountRepository) {
    this._cache = cache;
    this._accountRepo = accountRepo;
  }

  public async setAccount(data: IAccount): Promise<boolean> {
    try {
      await this._accountRepo.setAccount(data.account, data.userId as string);

      return true;
    } catch (error) {
      Logger.error(
        "[AccountRepository] SetAccount > ERRO_AO_SALVAR_CONTA",
        error
      );
      throw error;
    }
  }

  public async getAccounts(uid: string): Promise<IAccount[]> {
    try {
      const accounts = await this._accountRepo.getAccounts(uid);

      if (!accounts) {
        return;
      }

      return accounts;
    } catch (error) {
      Logger.error(
        "[AccountRepository] GetAccounts > ERRO_AO_RECUPERAR_DADO",
        error
      );
    }
  }

  public async getAccountById(accountId: any): Promise<string> {
    try {
      const account = await this._accountRepo.getAccountById(accountId);

      if (!account) {
        return;
      }

      return account;
    } catch (error) {
      Logger.error(
        "[AccountRepository] GetAccountById > ERRO_AO_RECUPERAR_DADO",
        error
      );
    }
  }
}

export default AccountService;
