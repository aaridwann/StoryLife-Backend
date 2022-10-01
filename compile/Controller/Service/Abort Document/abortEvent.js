"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortEvent = void 0;
const EventModels_1 = require("../../../Models/EventModels");
const abortEvent = async (userId) => {
    try {
        let res = await EventModels_1.eventDb.deleteOne({ userId: userId });
        if (res.deletedCount) {
            return { state: true, message: 'abort event is success' };
        }
        else {
            return { state: false, message: 'abort event is failed' };
        }
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.abortEvent = abortEvent;
