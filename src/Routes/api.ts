import { Router } from "express";
import {Auth} from '../middlewares/auth';
import * as UserController from '../controllers/UserController';
import * as TransactionController from '../controllers/TransactionController';
import * as AccountController from '../controllers/AccountController';
import * as CategoryController from '../controllers/CategoryController';


const router = Router();

//UserController
router.post('/register', UserController.register);
router.post('/login', UserController.login);

//TransactionController
router.post('/transaction', Auth.private, TransactionController.create);
router.get('/statementResume', Auth.private, TransactionController.getStatementResume);
router.post('/statementMonth', Auth.private, TransactionController.getStatementForMonth);
router.get('/income', Auth.private, TransactionController.getIcome);
router.get('/expense', Auth.private, TransactionController.getExpense);
router.post('/statementIncome', Auth.private, TransactionController.getIncomeForMonth);
router.post('/statementExpense', Auth.private, TransactionController.getExpenseForMonth);

//AccountController
router.post('/account', Auth.private, AccountController.create);
router.get('/account', Auth.private, AccountController.getAccounts);
router.get('/account/:id', Auth.private, AccountController.getAccountId);
router.put('/account/:id', Auth.private, AccountController.updateAccount);
router.delete('/account/:id' , Auth.private, AccountController.deleteAccount);

//CategoryController
router.post('/category', Auth.private, CategoryController.create);
router.get('/categories', Auth.private, CategoryController.getCategories);
router.get('/category/:id', Auth.private, CategoryController.getCategoryId);
router.put('/category/:id', Auth.private, CategoryController.updateCategory);
router.delete('/category/:id', Auth.private, CategoryController.deleteCategory);




export default router;