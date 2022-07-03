"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVendorSchedule = void 0;
const ScheduleVendorModels_1 = require("../Models/ScheduleVendorModels");
const createVendorSchedule = async (user, vendor, res) => {
    new ScheduleVendorModels_1.scheduleDb({
        vendorId: user._id,
        vendorName: user.name,
        scheduleList: []
    })
        .save((err) => {
        if (err) {
            return res.json(err);
        }
        console.log("Schedule Created");
    });
};
exports.createVendorSchedule = createVendorSchedule;
