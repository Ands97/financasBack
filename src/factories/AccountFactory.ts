export class AccountFactory {
    getService(): IAccountService {
        return new AccountService()
    }
}