import { IAccount } from "../models/IAccount";

export interface IAccountService {
  setAccount(data: IAccount): Promise<boolean>;
  getAccounts(uid: string): Promise<IAccount[]>;
  getAccountById(accountId): Promise<string>;
}
