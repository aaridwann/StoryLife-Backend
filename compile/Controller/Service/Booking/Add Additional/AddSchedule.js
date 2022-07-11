"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortSchedule = exports.addSchedule = void 0;
const ScheduleVendorModels_1 = require("../../../../Models/ScheduleVendorModels");
const addSchedule = async (vendorId, eventId, eventName, eventDate) => {
    try {
        const push = await ScheduleVendorModels_1.scheduleDb.updateOne({ vendorId: vendorId }, { $push: { scheduleList: { 'eventId': eventId, 'eventName': eventName, 'eventDate': eventDate } } });
        if (!push)
            return { state: false, message: 'add schedule failed' };
        return { state: true, message: 'success add schedule' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.addSchedule = addSchedule;
const abortSchedule = async (vendorId, eventId) => {
    try {
        const abort = await ScheduleVendorModels_1.scheduleDb.updateOne({ vendorId: vendorId }, { $pull: { scheduleList: { eventId: eventId } } });
        if (!abort)
            return { state: false, message: 'abort schedule is failed' };
        return { state: true, message: 'abort schedule success' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.abortSchedule = abortSchedule;
