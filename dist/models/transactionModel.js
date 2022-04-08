"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    transactionType: {
        type: String,
        required: true
    },
    transactionDescription: {
        type: String,
        required: true
    },
    transactionValue: {
        type: Number,
        required: true
    },
    transactionDate: {
        type: String,
        required: true
    },
    transactionPaymentDate: {
        type: String,
    },
    transactionStatus: {
        type: Boolean,
        required: true
    },
    transactionCategory: {
        type: String,
        required: true
    },
    transactionAccount: {
        type: String,
        required: true
    },
    transactionAccountDestination: {
        type: String
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Transaction", transactionSchema);
