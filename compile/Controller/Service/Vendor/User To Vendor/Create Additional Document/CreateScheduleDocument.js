"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbortScheduleDocument = exports.CreateScheduleDb = void 0;
const ScheduleVendorModels_1 = require("../../../../../Models/ScheduleVendorModels");
const CreateScheduleDb = async (userId, vendorName) => {
    try {
        const create = new ScheduleVendorModels_1.scheduleDb({ vendorId: userId, vendorName: vendorName, scheduleList: [] });
        const save = await create.save();
        if (!save) {
            return { state: false, message: 'something error' };
        }
        return { state: true, message: 'ok' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.CreateScheduleDb = CreateScheduleDb;
const AbortScheduleDocument = async (vendorId) => {
    try {
        const abort = await ScheduleVendorModels_1.scheduleDb.deleteOne({ vendorId: vendorId });
        if (!abort) {
            return { state: false, message: 'something error' };
        }
        return { state: true, message: 'ok' };
    }
    catch (err) {
        return { state: false, message: err.toString() };
    }
};
exports.AbortScheduleDocument = AbortScheduleDocument;
