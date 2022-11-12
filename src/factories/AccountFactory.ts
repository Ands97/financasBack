import Cache from "src/repositories/Cache";
import { IAccountService } from "../app/interfaces/services/IAccountService";
import AccountRepository from "../repositories/AccountRepository";
import AccountService from "../services/AccountService";

class AccountFactory {
  getService(): IAccountService {
    return new AccountService(new Cache(), new AccountRepository());
  }
}

export default AccountFactory;
