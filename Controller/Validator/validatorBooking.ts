import { Request, Response } from "express";
const { body } = require('express-validator');
type Booking ={
    eventName: string;
    eventId: String;
    location: String;
    bookingDate: Date
    eventDate: Date;
    bookingStatus: 'rejected' | 'pending' | 'accepted'
    paidStatus: true | false
    idVendor: String;
    vendorName: String;
    vendorAddress: String;
    vendorPhone: String;

}

export const validatorBooking = (req: Request, res: Response) => {
    let { eventId, idVendor, eventName, vendorName, vendorAddress, location, bookingDate, eventDate, bookingStatus, paidStatus, vendorPhone } = req.body
    let data: Booking = {
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
    }
    // console.log(data)
    res.json(data)
}