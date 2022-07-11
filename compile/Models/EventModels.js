"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventDb = exports.categoryEvent = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.categoryEvent = ['wedding', 'party', 'prewedding', 'birthday', 'engagement', 'religion'];
let vendorCategory = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service'];
const event = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    event: [{
            eventName: { type: String, trim: true, lowercase: true },
            eventDate: Number,
            eventLocation: { street: String, city: String, province: String, state: String },
            eventCategory: { type: String, enum: exports.categoryEvent },
            vendor: [{
                    vendorId: { type: String, default: '', lowercase: true, trim: true },
                    vendorName: { type: String, default: '', lowercase: true, trim: true },
                    vendorCategory: { type: String, enum: vendorCategory },
                    vendorPhone: { phone1: { type: String, default: '' }, phone2: { type: String, default: '' } },
                    package: [{
                            packageId: String, packageName: String,
                            category: String, price: Number, discount: Number,
                            total: Number,
                        }],
                }],
            totalCost: { type: Number, default: 0, min: 0 },
        }]
});
exports.eventDb = mongoose_1.default.model('event', event);
