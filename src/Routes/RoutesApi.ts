import { Response, Router } from "express";
import { Auth } from '../middlewares/auth';
import * as UserController from '../controllers/UserController';
import * as TransactionController from '../controllers/TransactionController';
import AccountController from "../controllers/AccountController";
import * as CategoryController from '../controllers/CategoryController';



class RoutesApi {
    readonly router: Router;

    constructor() {
        this.router = Router();
    }

    public getRotas(): Router {
        return this.router;
    }

    public startRoutes(): RoutesApi {
        this.router.get('/', async (_, res: Response) => {
            res.json({ message: 'ok' })
        });

        this.router.use(Auth.private);
        this.router.use('/auth', this.userRoutes())
        this.router.use('/transaction', this.transactionsRoutes())
        this.router.use('/account', this.accountsRoutes())
        this.router.use('/category', this.categoryRoutes())

        return this
    }

    private userRoutes(): Router {
        const userRoutes = Router();

        userRoutes.post('/register', UserController.register);
        userRoutes.post('/login', UserController.login);
        userRoutes.post('/validateToken', UserController.validateToken);

        return userRoutes;
    }

    private transactionsRoutes(): Router {
        const transactionsRoutes = Router();

        transactionsRoutes.post('/transaction', TransactionController.create);
        transactionsRoutes.get('/statementResume', TransactionController.getStatementResume);
        transactionsRoutes.post('/statementMonth', TransactionController.getStatementForMonth);
        transactionsRoutes.get('/income', TransactionController.getIcome);
        transactionsRoutes.get('/expense', TransactionController.getExpense);
        transactionsRoutes.post('/statementIncome', TransactionController.getIncomeForMonth);
        transactionsRoutes.post('/statementExpense', TransactionController.getExpenseForMonth);
        transactionsRoutes.post('/incomeProfit', TransactionController.getIncomeProfit);
        transactionsRoutes.post('/expenseProfit', TransactionController.getExpenseProfit);
        transactionsRoutes.put('/reverseTransaction/:id', TransactionController.reverseTransaction);
        transactionsRoutes.delete('/deleteTransaction/:id', TransactionController.removeTransaction);

        //billsToPay
        transactionsRoutes.get('/billsToPay', TransactionController.billsToPay);
        transactionsRoutes.put('/billsToPay/:id', TransactionController.updateBillsToPay);
        //billsToReceive
        transactionsRoutes.get('/billsToReceive', TransactionController.billsToReceive);
        transactionsRoutes.put('/billsToReceive/:id', TransactionController.updateBillsToReceive);
        //bills general
        transactionsRoutes.get('/bills/:id', TransactionController.billsId);

        return transactionsRoutes;
    }

    private accountsRoutes(): Router {
        const accountsRoutes = Router();

        accountsRoutes.post('/account', AccountController.createAccount);
        accountsRoutes.get('/account', AccountController.getAccounts);
        accountsRoutes.get('/account/:id', AccountController.getAccountId);
        accountsRoutes.put('/account/:id', AccountController.updateAccount);
        accountsRoutes.delete('/account/:id', AccountController.deleteAccount);

        return accountsRoutes;
    }

    private categoryRoutes(): Router {
        const categoryRoutes = Router();

        categoryRoutes.post('/category', Auth.private, CategoryController.create);
        categoryRoutes.put('/subcategory/:id', Auth.private, CategoryController.createSubCat);
        categoryRoutes.get('/categories', Auth.private, CategoryController.getCategories);
        categoryRoutes.get('/category/:id', Auth.private, CategoryController.getCategoryId);
        categoryRoutes.put('/category/:id', Auth.private, CategoryController.updateCategory);
        categoryRoutes.delete('/category/:id', Auth.private, CategoryController.deleteCategory);

        return categoryRoutes;
    }

}

export default RoutesApi;