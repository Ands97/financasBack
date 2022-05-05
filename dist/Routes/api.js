"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const UserController = __importStar(require("../controllers/UserController"));
const TransactionController = __importStar(require("../controllers/TransactionController"));
const AccountController = __importStar(require("../controllers/AccountController"));
const CategoryController = __importStar(require("../controllers/CategoryController"));
const router = (0, express_1.Router)();
//UserController
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/validateToken', UserController.validateToken);
//TransactionController
router.post('/transaction', auth_1.Auth.private, TransactionController.create);
router.get('/statementResume', auth_1.Auth.private, TransactionController.getStatementResume);
router.post('/statementMonth', auth_1.Auth.private, TransactionController.getStatementForMonth);
router.get('/income', auth_1.Auth.private, TransactionController.getIcome);
router.get('/expense', auth_1.Auth.private, TransactionController.getExpense);
router.post('/statementIncome', auth_1.Auth.private, TransactionController.getIncomeForMonth);
router.post('/statementExpense', auth_1.Auth.private, TransactionController.getExpenseForMonth);
router.post('/incomeProfit', auth_1.Auth.private, TransactionController.getIncomeProfit);
router.post('/expenseProfit', auth_1.Auth.private, TransactionController.getExpenseProfit);
router.put('/reverseTransaction/:id', auth_1.Auth.private, TransactionController.reverseTransaction);
router.delete('/deleteTransaction/:id', auth_1.Auth.private, TransactionController.removeTransaction);
//billsToPay
router.get('/billsToPay', auth_1.Auth.private, TransactionController.billsToPay);
router.put('/billsToPay/:id', auth_1.Auth.private, TransactionController.updateBillsToPay);
//billsToReceive
router.get('/billsToReceive', auth_1.Auth.private, TransactionController.billsToReceive);
router.put('/billsToReceive/:id', auth_1.Auth.private, TransactionController.updateBillsToReceive);
//bills general
router.get('/bills/:id', auth_1.Auth.private, TransactionController.billsId);
//AccountController
router.post('/account', auth_1.Auth.private, AccountController.create);
router.get('/account', auth_1.Auth.private, AccountController.getAccounts);
router.get('/account/:id', auth_1.Auth.private, AccountController.getAccountId);
router.put('/account/:id', auth_1.Auth.private, AccountController.updateAccount);
router.delete('/account/:id', auth_1.Auth.private, AccountController.deleteAccount);
//CategoryController
router.post('/category', auth_1.Auth.private, CategoryController.create);
router.put('/subcategory/:id', auth_1.Auth.private, CategoryController.createSubCat);
router.get('/categories', auth_1.Auth.private, CategoryController.getCategories);
router.get('/category/:id', auth_1.Auth.private, CategoryController.getCategoryId);
router.put('/category/:id', auth_1.Auth.private, CategoryController.updateCategory);
router.delete('/category/:id', auth_1.Auth.private, CategoryController.deleteCategory);
exports.default = router;
