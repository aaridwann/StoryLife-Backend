"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrder = exports.addOrder = void 0;
const OrderModels_1 = require("../Models/OrderModels");
const mongodb_1 = require("mongodb");
const addOrder = async (booking, vendor, client, res) => {
    let orederid = '123';
    let data = {
        vendorId: vendor.vendorId,
        vendorName: vendor.vendorName,
        orderList: [
            {
                orderId: orederid,
                eventName: booking.eventName,
                clientName: client.clientName,
                orderDetail: {
                    eventName: booking.eventName,
                    eventId: booking.eventId,
                    location: booking.location,
                    bookingDate: booking.bookingDate,
                    eventDate: booking.eventDate,
                    package: vendor.package,
                    notes: vendor.notes,
                    clientId: client.clientId,
                    clientName: client.clientName,
                    clientAddress: client.clientAddress,
                    clientPhone: client.clientPhone
                },
                status: {
                    bookingStatus: 'pending',
                    paidStatus: false
                }
            }
        ]
    };
    let orderData = new OrderModels_1.orderDb(data).save(async (err) => {
        if (err) {
            // await pushOrder(data, res);
        }
        else {
            return res.json({ message: 'Order telah dibuat', data: orderData });
        }
    });
};
exports.addOrder = addOrder;
// async function pushOrder(data: OrderSchema, res: any) {
//     if (!data.orderList) {
//         return res.json(false)
//     } else {
//         await orderDb.updateOne({ vendorId: data.vendorId, vendorName: data.vendorName }, { $push: { orderList: data.orderList } })
//         res.json({ message: 'Data order berhasil di push', data: pushData })
//     }
// }
const cancelOrder = async (req, res) => {
    if (!req.query.orderId) {
        return res.json({ message: "isi tidak ada", format: 'orderId' });
    }
    try {
        let response = await OrderModels_1.orderDb.findOne({ vendorId: req.query.vendorId, 'orderList._id': new mongodb_1.ObjectId(req.query.orderId) }, { 'orderList.$': 1 });
        if (response == null) {
            res.json({ message: 'Vendor Atau Booking tidak ada' });
        }
        else {
            res.json(response);
        }
    }
    catch (error) {
        res.json(error);
    }
};
exports.cancelOrder = cancelOrder;
