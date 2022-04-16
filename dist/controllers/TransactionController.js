"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.billsId = exports.updateBillsToReceive = exports.billsToReceive = exports.updateBillsToPay = exports.billsToPay = exports.getExpenseProfit = exports.getIncomeProfit = exports.getExpenseForMonth = exports.getIncomeForMonth = exports.getStatementForMonth = exports.getExpense = exports.getIcome = exports.getStatementResume = exports.create = void 0;
const transactionModel_1 = __importDefault(require("../models/transactionModel"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, description, value, date, paymentDate, Tstatus, category, account, acountDestination } = req.body;
        if (type === 'transfer') {
            const transactionIncome = yield transactionModel_1.default.create({
                transactionType: 'income',
                transactionDescription: description,
                transactionValue: value,
                transactionDate: date,
                transactionPaymentDate: paymentDate,
                transactionStatus: Tstatus,
                transactionCategory: category,
                transactionAccount: acountDestination,
                userId: req.userId
            });
            const transactionExpense = yield transactionModel_1.default.create({
                transactionType: 'expense',
                transactionDescription: description,
                transactionValue: value,
                transactionDate: date,
                transactionPaymentDate: paymentDate,
                transactionStatus: Tstatus,
                transactionCategory: category,
                transactionAccount: account,
                userId: req.userId
            });
            res.status(201).json({ transactionIncome, transactionExpense });
        }
        else {
            const newTransaction = yield transactionModel_1.default.create({
                transactionType: type,
                transactionDescription: description,
                transactionValue: value,
                transactionDate: date,
                transactionPaymentDate: paymentDate,
                transactionStatus: Tstatus,
                transactionCategory: category,
                transactionAccount: account,
                userId: req.userId
            });
            res.status(201).json({ newTransaction });
        }
    }
    catch (error) {
        res.status(403).send(error);
    }
});
exports.create = create;
const getStatementResume = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield transactionModel_1.default.find({
            userId: req.userId,
            transactionStatus: true
        }).limit(5).sort({ transactionPaymentDate: -1 });
        res.json(list);
    }
    catch (err) {
        res.status(404);
    }
});
exports.getStatementResume = getStatementResume;
const getIcome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield transactionModel_1.default.find({
            userId: req.userId,
            transactionStatus: true,
            transactionType: 'income'
        });
        const secondList = yield transactionModel_1.default.find({
            userId: req.userId,
            transactionStatus: true,
            transactionType: 'income',
            transactionCategory: 'transfer'
        });
        const income = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
        const transferIncome = secondList.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
        const result = income - transferIncome;
        res.json(result);
    }
    catch (error) {
        res.status(404).json(error);
    }
});
exports.getIcome = getIcome;
const getExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield transactionModel_1.default.find({
            userId: req.userId,
            transactionStatus: true,
            transactionType: 'expense'
        });
        const secondList = yield transactionModel_1.default.find({
            userId: req.userId,
            transactionStatus: true,
            transactionType: 'expense',
            transactionCategory: 'transfer'
        });
        const expense = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
        const transferExpense = secondList.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
        const result = expense - transferExpense;
        res.json(result);
    }
    catch (error) {
        res.status(404).json(error);
    }
});
exports.getExpense = getExpense;
const getStatementForMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body.date;
    const firstDate = `${date}-01`;
    const lastDate = `${date}-31`;
    const { account, category } = req.body;
    if (category === 'Todas as Categorias' && account !== 'Todas as Contas') {
        if (date && account) {
            try {
                const statementForMonth = yield transactionModel_1.default.find({
                    userId: req.userId,
                    transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                    transactionAccount: account
                }).sort({ transactionPaymentDate: -1 });
                res.json(statementForMonth);
            }
            catch (error) {
                res.status(404).json(error);
            }
        }
    }
    else if (account === 'Todas as Contas' && category !== 'Todas as Categorias') {
        if (date && category) {
            try {
                const statementForMonth = yield transactionModel_1.default.find({
                    userId: req.userId,
                    transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                    transactionCategory: category
                }).sort({ transactionPaymentDate: -1 });
                res.json(statementForMonth);
            }
            catch (error) {
                res.status(404).json(error);
            }
        }
    }
    else if (account === 'Todas as Contas' && category === 'Todas as Categorias') {
        try {
            const statementForMonth = yield transactionModel_1.default.find({
                userId: req.userId,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
            }).sort({ transactionPaymentDate: -1 });
            res.json(statementForMonth);
        }
        catch (error) {
            res.status(404).json(error);
        }
    }
    else {
        try {
            const statementForMonth = yield transactionModel_1.default.find({
                useId: req.userId,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                transactionAccount: account,
                transactionCategory: category
            }).sort({ transactionPaymentDate: -1 });
            res.json(statementForMonth);
        }
        catch (error) {
            res.status(404).json(error);
        }
    }
});
exports.getStatementForMonth = getStatementForMonth;
const getIncomeForMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body.date;
    const firstDate = `${date}-01`;
    const lastDate = `${date}-31`;
    const { account, category } = req.body;
    if (category === 'Todas as Categorias' && account !== 'Todas as Contas') {
        try {
            const list = yield transactionModel_1.default.find({
                userId: req.userId,
                transactionStatus: true,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                transactionType: 'income',
                transactionAccount: account
            });
            const income = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
            if (income) {
                res.json(income);
            }
            else {
                res.json(0);
            }
        }
        catch (error) {
            res.json(0);
        }
    }
    else if (account === 'Todas as Contas' && category !== 'Todas as Categorias') {
        try {
            const list = yield transactionModel_1.default.find({
                userId: req.userId,
                transactionStatus: true,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                transactionType: 'income',
                transactionCategory: category
            });
            let income = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
            if (income) {
                res.json(income);
            }
            else {
                res.json(0);
            }
        }
        catch (error) {
            res.json(0);
        }
    }
    else if (account === 'Todas as Contas' && category === 'Todas as Categorias') {
        try {
            const list = yield transactionModel_1.default.find({
                userId: req.userId,
                transactionStatus: true,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                transactionType: 'income',
            });
            const income = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
            if (income) {
                res.json(income);
            }
            else {
                res.json(0);
            }
        }
        catch (error) {
            res.json(0);
        }
    }
    else {
        try {
            const list = yield transactionModel_1.default.find({
                userId: req.userId,
                transactionStatus: true,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                transactionType: 'income',
                transactionAccount: account,
                transactionCategory: category
            });
            const income = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
            if (income) {
                res.json(income);
            }
            else {
                res.json(0);
            }
        }
        catch (error) {
            res.json(0);
        }
    }
});
exports.getIncomeForMonth = getIncomeForMonth;
//Expense
const getExpenseForMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const date = req.body.date;
    const firstDate = `${date}-01`;
    const lastDate = `${date}-31`;
    const { account, category } = req.body;
    if (category === 'Todas as Categorias' && account !== 'Todas as Contas') {
        try {
            const list = yield transactionModel_1.default.find({
                userId: req.userId,
                transactionStatus: true,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                transactionType: 'expense',
                transactionAccount: account
            });
            const expense = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
            if (expense) {
                res.json(expense);
            }
            else {
                res.json(0);
            }
        }
        catch (error) {
            res.json(0);
        }
    }
    else if (account === 'Todas as Contas' && category !== 'Todas as Categorias') {
        try {
            const list = yield transactionModel_1.default.find({
                userId: req.userId,
                transactionStatus: true,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                transactionType: 'expense',
                transactionCategory: category
            });
            const expense = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
            if (expense) {
                res.json(expense);
            }
            else {
                res.json(0);
            }
        }
        catch (error) {
            res.json(0);
        }
    }
    else if (account === 'Todas as Contas' && category === 'Todas as Categorias') {
        try {
            const list = yield transactionModel_1.default.find({
                userId: req.userId,
                transactionStatus: true,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                transactionType: 'expense',
            });
            const expense = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
            if (expense) {
                res.json(expense);
            }
            else {
                res.json(0);
            }
        }
        catch (error) {
            res.json(0);
        }
    }
    else {
        try {
            const list = yield transactionModel_1.default.find({
                userId: req.userId,
                transactionStatus: true,
                transactionPaymentDate: { $gte: firstDate, $lte: lastDate },
                transactionType: 'expense',
                transactionAccount: account,
                transactionCategory: category
            });
            const expense = list.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
            if (expense) {
                res.json(expense);
            }
            else {
                res.json(0);
            }
        }
        catch (error) {
            res.json(0);
        }
    }
});
exports.getExpenseForMonth = getExpenseForMonth;
//profit
const getIncomeProfit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body.account;
    try {
        const listIncome = yield transactionModel_1.default.find({
            userId: req.userId,
            transactionStatus: true,
            transactionType: 'income',
            transactionAccount: account
        });
        const income = listIncome.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
        res.json(income);
    }
    catch (error) {
        res.json(0);
    }
});
exports.getIncomeProfit = getIncomeProfit;
const getExpenseProfit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const account = req.body.account;
    try {
        const listExpense = yield transactionModel_1.default.find({
            userId: req.userId,
            transactionStatus: true,
            transactionType: 'expense',
            transactionAccount: account
        });
        const expense = listExpense.map((item) => (item.transactionValue)).reduce((total, item) => total += item);
        res.json(expense);
    }
    catch (error) {
        res.json(0);
    }
});
exports.getExpenseProfit = getExpenseProfit;
//Bills to pay
const billsToPay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield transactionModel_1.default.find({
            userId: req.userId,
            transactionStatus: false,
            transactionType: 'expense'
        }).sort({ transactionDate: 1 });
        res.json(list);
    }
    catch (error) {
        res.json(error);
    }
});
exports.billsToPay = billsToPay;
const updateBillsToPay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { value, account, Tstatus, paymentDate } = req.body;
    if (value && account && Tstatus && paymentDate) {
        try {
            const updated = yield transactionModel_1.default.updateOne({ _id: id }, {
                transactionValue: value,
                transactionAccount: account,
                transactionStatus: Tstatus,
                transactionPaymentDate: paymentDate
            });
            res.json(updated);
        }
        catch (error) {
            res.json(error);
        }
    }
});
exports.updateBillsToPay = updateBillsToPay;
//BillsToReceive
const billsToReceive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield transactionModel_1.default.find({
            userId: req.userId,
            transactionStatus: false,
            transactionType: 'income'
        }).sort({ transactionDate: -1 });
        res.json(list);
    }
    catch (error) {
        res.json(error);
    }
});
exports.billsToReceive = billsToReceive;
const updateBillsToReceive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { value, account, Tstatus, paymentDate } = req.body;
    if (value && account && Tstatus && paymentDate) {
        try {
            const updated = yield transactionModel_1.default.updateOne({ _id: id }, {
                transactionValue: value,
                transactionAccount: account,
                transactionStatus: Tstatus,
                transactionPaymentDate: paymentDate
            });
            res.json(updated);
        }
        catch (error) {
            res.json(error);
        }
    }
});
exports.updateBillsToReceive = updateBillsToReceive;
const billsId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const list = yield transactionModel_1.default.findById({ _id: id });
        res.json(list);
    }
    catch (error) {
        res.json(error);
    }
});
exports.billsId = billsId;
