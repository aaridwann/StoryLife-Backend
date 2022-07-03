"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleVendorModels_1 = require("../Models/ScheduleVendorModels");
module.exports = class Schedule {
    constructor(vendor, client, event) {
        this.client = client,
            this.vendor = vendor,
            this.event = event,
            this.message = { message: 'Add Schedule is Failed' };
    }
    async addSchedule() {
        let data = {
            eventId: this.event.eventId,
            eventName: this.event.eventName,
            eventDate: this.event.eventDate
        };
        try {
            await ScheduleVendorModels_1.scheduleDb.updateOne({ vendorId: this.vendor.vendorId, vendorName: this.vendor.vendorName }, { $push: { scheduleList: data } });
            this.message = { message: 'Add Schedule Is Success' };
        }
        catch (error) {
            this.message = { message: 'Add Schedule Is Fail => ' + error };
        }
    }
};
