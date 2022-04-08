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
exports.deleteAccount = exports.updateAccount = exports.getAccountId = exports.getAccounts = exports.create = void 0;
const accountModel_1 = __importDefault(require("../models/accountModel"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAccount = yield accountModel_1.default.create({ account: req.body.title, userId: req.userId });
        res.status(201).json({ newAccount });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.create = create;
const getAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield accountModel_1.default.find({ userId: req.userId });
        res.json(list);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getAccounts = getAccounts;
const getAccountId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const account = yield accountModel_1.default.findById({ _id: req.params.id });
        res.json(account);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getAccountId = getAccountId;
const updateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const title = req.body.title;
        if (title) {
            const update = yield accountModel_1.default.updateOne({ _id: id }, { account: title });
            res.json({ update });
        }
        else {
            res.json({ error: 'Não recebemos o título a ser atualizado!' });
        }
    }
    catch (error) {
        res.status(404);
    }
});
exports.updateAccount = updateAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id) {
            const del = yield accountModel_1.default.deleteOne({ _id: id });
            res.status(200).json({ message: 'deleted' });
        }
        else {
            res.json({ error: 'conta não encontrada!' });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteAccount = deleteAccount;
