"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.abortOrder = exports.addOrder = void 0;
const OrderModels_1 = require("../../../../Models/OrderModels");
const addOrder = async (data, bookingId) => {
    // 1. Init data
    const Data = {
        bookingId: bookingId,
        eventName: data.bookingInformation.eventName,
        clientName: data.clientInformation.clientName,
        orderDetail: {
            eventName: data.bookingInformation.eventName,
            eventId: data.bookingInformation.eventId,
            eventLocation: data.bookingInformation.eventLocation,
            bookingDate: data.bookingInformation.bookingDate,
            eventDate: data.bookingInformation.eventDate,
            package: data.vendorInformation.package,
            notes: data.vendorInformation.package[0].notes,
            clientId: data.clientInformation.clientId,
            clientName: data.clientInformation.clientName,
            clientAddress: data.clientInformation.clientAddress,
            clientPhone: data.clientInformation.clientPhone,
        },
        status: {
            bookingStatus: 'pending',
            paidStatus: false
        }
    };
    try {
        const push = await OrderModels_1.orderDb.findOneAndUpdate({ vendorId: data.vendorInformation.vendorId }, { $push: { orderList: Data } }, { returnNewDocument: true });
        if (!push)
            return { state: false, message: 'add order failed' };
        return { state: true, message: push };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.addOrder = addOrder;
// 2. ABORT ORDER
const abortOrder = async (vendorId, eventId) => {
    try {
        const abort = await OrderModels_1.orderDb.updateOne({ vendorId: vendorId }, { $pull: { orderList: { 'orderDetail.eventId': eventId } } });
        if (!abort.modifiedCount)
            return { state: false, message: 'abort order failed' };
        return { state: true, message: 'success abort order' };
    }
    catch (error) {
        return { state: false, message: error.toString() };
    }
};
exports.abortOrder = abortOrder;
