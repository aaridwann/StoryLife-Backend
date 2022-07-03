"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order = new mongoose_1.default.Schema({
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true, unique: true },
    orderList: [{
            orderId: { type: String, required: true },
            eventName: { type: String, required: true },
            clientName: { type: String, required: true },
            orderDetail: {
                eventName: { type: String, required: true },
                eventId: { type: String, required: true },
                location: { type: Object, required: true },
                bookingDate: { type: Date, required: true },
                eventDate: { type: Date, required: true },
                package: [{
                        name: { type: String, required: true },
                        details: { type: String, required: true },
                        price: { type: Number, required: true },
                        discount: { type: Number, required: true },
                        quantity: { type: Number, required: true },
                        total: { type: Number, required: true },
                    }],
                notes: { type: String, default: '' },
                clientId: { type: String, required: true },
                clientName: { type: String, required: true },
                clientAddress: { type: String, required: true },
                clientPhone: { type: String, required: true },
            },
            status: {
                bookingStatus: { type: String, enum: ['pending', 'accepted', 'rejected'], required: true },
                paidStatus: { type: Boolean, required: true }
            }
        }]
});
exports.orderDb = mongoose_1.default.model('order', order);
