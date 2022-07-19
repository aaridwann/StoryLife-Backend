"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const balance = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    balance: { type: Number, min: 0 },
    state: { type: Boolean, default: false },
    bank: {
        name: { type: String, default: '' },
        accountNumber: { type: String, default: '' }
    },
    transaction: [{
            state: { type: String, enum: ['cash in', 'cash out'] },
            from: { type: String },
            to: { type: String },
            amount: { type: Number },
            date: { type: Number },
            message: { type: String },
        }],
});
exports.balanceDb = mongoose_1.default.model('balance', balance);
