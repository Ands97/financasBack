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
exports.getCategoryId = exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createSubCat = exports.create = void 0;
const categoryModel_1 = __importDefault(require("../models/categoryModel"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCategory = yield categoryModel_1.default.create({ category: req.body.title, userId: req.userId });
        res.json(newCategory);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.create = create;
const createSubCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const subCat = req.body.subCat;
        const newSubCat = yield categoryModel_1.default.updateOne({ _id: id }, { $push: { subCategory: subCat } });
        res.json(newSubCat);
    }
    catch (error) {
        res.json(error);
    }
});
exports.createSubCat = createSubCat;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const list = yield categoryModel_1.default.find({ userId: req.userId });
        res.json(list);
    }
    catch (error) {
        res.status(403).json({ error });
    }
});
exports.getCategories = getCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const title = req.body.title;
        if (title) {
            const update = yield categoryModel_1.default.updateOne({ _id: id }, { category: title });
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
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id) {
            const del = yield categoryModel_1.default.deleteOne({ _id: id });
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
exports.deleteCategory = deleteCategory;
const getCategoryId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryModel_1.default.findById({ _id: req.params.id });
        res.json(category);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getCategoryId = getCategoryId;
