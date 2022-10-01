"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorBooking = void 0;
const { body } = require('express-validator');
const validatorBooking = (req, res) => {
    let { eventId, idVendor, eventName, vendorName, vendorAddress, location, bookingDate, eventDate, bookingStatus, paidStatus, vendorPhone } = req.body;
    let data = {
        eventName: eventName,
        eventId: eventId,
        location: location,
        bookingDate: bookingDate,
        eventDate: eventDate,
        bookingStatus: bookingStatus,
        paidStatus: paidStatus,
        idVendor: idVendor,
        vendorName: vendorName,
        vendorAddress: vendorAddress,
        vendorPhone: vendorPhone
    };
    // console.log(data)
    res.json(data);
};
exports.validatorBooking = validatorBooking;
