"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongo = require('mongoose');
const categoryVendor = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service'];
const bookingStatus = ['rejected', 'pending', 'accepted'];
const booking = new mongoose_1.default.Schema({
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    bookingList: [{
            bookingInformation: {
                eventName: { type: String, required: true },
                eventId: { type: String },
                location: { street: String, city: String, province: String, state: String },
                eventDate: { type: Number },
                bookingDate: { type: Number },
                bookingStatus: { type: Boolean },
                paidStatus: { type: Boolean },
            },
            vendorInformation: {
                vendorId: { type: String },
                vendorName: { type: String },
                vendorAddress: { street: String, city: String, province: String, state: String },
                vendorPhone: [{ first: String, second: String }],
                vendorCategory: { type: String },
                package: [{
                        _id: String, packageName: String, description: String,
                        price: Number, discount: Number, quantity: Number, total: Number, notes: String
                    }],
            },
            clientInformation: {
                clientId: String,
                clientName: String,
                clientAddress: String,
                clientPhone: [{ first: String, second: String }]
            },
            default: []
        }]
});
exports.bookingDb = mongoose_1.default.model('booking', booking);
// const booking = new mongo.Schema({
//     // Booking information
//     eventName: { type: String, required: true },
//     eventId: { type: String, required: true },
//     location: { type: Object, required: true },
//     bookingDate: { type: String, required: true, default: new Date().toString() },
//     eventDate: { type: String, required: true },
//     bookingStatus: { type: String, enum: bookingStatus },
//     paidStatus: { type: Boolean, default: false },
//     // Vendor
//     vendorId: { type: String, required: true },
//     vendorName: { type: String, required: true },
//     vendorAddress: { type: String, required: true },
//     vendorPhone: { type: Array, required: true },
//     vendorCategory: { type: String, enum: categoryVendor },
//     package: [{
//         _id: { type: String, required: true },
//         packageName: { type: String, required: true },
//         details: { type: String, required: true },
//         price: { type: Number, required: true },
//         discount: { type: Number, default: 0 },
//         quantity: { type: Number, required: true, min: 1 },
//         total: { type: Number, default: 0 }
//     }, { required: true }],
//     notes: { type: String, default: "" },
//     // Klien
//     clientId: { type: String, required: true },
//     clientName: { type: String, required: true },
//     clientAddress: { type: String, required: true },
//     clientPhone: { type: String, required: true }
// })
// module.exports = mongo.model('booking', booking)
