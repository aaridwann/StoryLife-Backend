"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendor = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categoryList = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service'];
const identityList = ['ktp', 'sim'];
const vendorDb = new mongoose_1.default.Schema({
    image: { type: String, default: '' },
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true, unique: true, trim: true, lowercase: true },
    identity: {
        typeIdentity: { type: String, enum: identityList },
        numberIdentity: { type: Number, required: true, unique: true }
    },
    vendorCategory: { type: String, enum: categoryList },
    address: { street: { type: String, required: true }, city: { type: String, required: true }, province: { type: String, required: true }, state: { type: String, required: true } },
    contact: { phone1: String, phone2: String },
    bankAccount: [{ bankName: { type: String, required: true }, accountNumber: { type: String, required: true } }],
    state: { type: Boolean, default: false },
    balance: { type: Number, default: 0 }
});
exports.vendor = mongoose_1.default.model('vendor', vendorDb);
