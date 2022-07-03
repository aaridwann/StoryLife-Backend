"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const users = new Schema({
    name: { type: String, required: true, unique: false, lowercase: true, trim: true },
    address: { type: String, default: '' },
    phone: { type: String, default: '' },
    verify: { type: Boolean, default: false },
    vendor: { type: Boolean, default: false },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 4 },
    refreshToken: { type: String, default: '' }
}, { timestamps: true });
exports.userDb = mongoose_1.default.model('users', users);
