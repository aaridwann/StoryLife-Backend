"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const stateType = ['suspense', 'unsuspense'];
const suspense = new Schema({
    userId: { type: String, required: true, unique: true },
    status: { type: String, enum: stateType, default: 'unsuspense' },
    alert: { type: Number, default: 0, maxLengt: 4 }
});
const SuspenseModels = mongoose_1.default.model('suspense', suspense);
exports.default = SuspenseModels;
