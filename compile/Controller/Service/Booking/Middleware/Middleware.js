"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareAlreadyBooking = void 0;
const mongodb_1 = require("mongodb");
const EventModels_1 = require("../../../../Models/EventModels");
const middlewareAlreadyBooking = async (eventId, packageId) => {
    try {
        const check = await EventModels_1.eventDb.findOne({ event: { $elemMatch: { _id: new mongodb_1.ObjectId(eventId), 'vendor': { $elemMatch: { 'package._id': new mongodb_1.ObjectId(packageId) } } } } }, { 'event.vendor.$': 1 });
        if (check)
            return { state: false, message: 'you already booking' };
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.middlewareAlreadyBooking = middlewareAlreadyBooking;
