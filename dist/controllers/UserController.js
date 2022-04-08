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
exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let { name, email, password } = req.body;
        let hasUser = yield userModel_1.default.findOne({ email });
        if (!hasUser) {
            let newUser = yield userModel_1.default.create({ name, email, password: yield bcrypt_1.default.hash(password, 10) });
            const token = jsonwebtoken_1.default.sign({ id: newUser._id, name: newUser.name, email: newUser.email }, process.env.JWT_SECRET_KEY);
            res.status(201).json({ id: newUser._id, token });
            return;
        }
        else {
            res.json('Email já existe');
        }
    }
    res.json({ error: 'Email e/ou senha não enviado!' });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) {
        let { email, password } = req.body;
        let user = yield userModel_1.default.findOne({ email });
        let username = user === null || user === void 0 ? void 0 : user.name;
        if (user) {
            if (yield bcrypt_1.default.compare(password, user.password)) {
                const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
                res.json({ status: true, token, username });
                return;
            }
        }
    }
    res.json({ status: false });
});
exports.login = login;
