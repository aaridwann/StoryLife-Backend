"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingDocument = void 0;
const BookingModels_1 = require("../../../Models/BookingModels");
// Create Booking document in user first registered
const CreateBookingDocument = async (id, username) => {
    try {
        let res = new BookingModels_1.bookingDb({ userId: id, userName: username });
        let exec = await res.save();
        if (!exec) {
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.CreateBookingDocument = CreateBookingDocument;
