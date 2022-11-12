import { IAccount } from "../models/IAccount";

export interface IAccountRepository {
  setAccount(account: string, uid: string): Promise<boolean>;
  getAccounts(uid: string): Promise<IAccount[]>;
  getAccountById(accountId: string): Promise<string>;
}
