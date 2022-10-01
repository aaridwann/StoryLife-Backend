"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortBooking = void 0;
const BookingModels_1 = require("../../../../Models/BookingModels");
const AbortBooking = async (userId, eventId) => {
    try {
        const abort = await BookingModels_1.bookingDb.updateOne({ userId: userId }, { $pull: { bookingList: { 'bookingInformation.eventId': eventId } } });
        if (!abort.modifiedCount)
            return { state: false, message: 'abort booking failed' };
        return { state: true, message: 'success abort booking' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.AbortBooking = AbortBooking;
