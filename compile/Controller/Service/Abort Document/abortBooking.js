"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortBooking = void 0;
const BookingModels_1 = require("../../../Models/BookingModels");
const abortBooking = async (userId) => {
    try {
        let res = await BookingModels_1.bookingDb.deleteOne({ userId: userId });
        if (res.deletedCount) {
            return { state: true, message: 'abort booking is success' };
        }
        else {
            return { state: false, message: 'abort booking is failed' };
        }
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.abortBooking = abortBooking;
