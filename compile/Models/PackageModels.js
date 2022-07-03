"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.packagedb = exports.CategoryPackage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CategoryPackage = ['party', 'wedding', 'prewedding', 'birthday', 'engagement'];
const packageList = new mongoose_1.default.Schema({
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true, unique: true },
    package: [{
            packageName: { type: String, required: true },
            category: { type: String, enum: exports.CategoryPackage, required: true },
            price: { type: Number, required: true, min: 6 },
            details: { type: String, required: true, min: 25 },
            discount: { type: Number, default: 0 },
            image: { type: String, default: '' }
        }]
}, { timestamps: true });
exports.packagedb = mongoose_1.default.model('packageList', packageList);
