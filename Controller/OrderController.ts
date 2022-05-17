import { orderDb, OrderSchema } from "../Models/OrderModels";
import { BookingInformation, Vendor, Client } from "./BookingController";
import { response, Response } from "express";
import { ObjectId } from "mongodb";
interface Query {
    eventId: string
    eventName: string
    vendorId: string,
    vendorName: string
    orderId: string
}

export const addOrder = async (booking: BookingInformation, vendor: Vendor, client: Client, res: Response) => {
    let orederid = '123'
    let data: OrderSchema = {
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
    }
    let orderData: any = new orderDb(data).save(async (err: any) => {
        if (err) {
            return pushOrder(data, res);
        }
        return res.json({ message: 'Order telah dibuat', data: orderData });
    })
}

async function pushOrder(data: OrderSchema, res: any): Promise<void> {
    let pushData = await orderDb.updateOne({ vendorId: data.vendorId, vendorName: data.vendorName },
        { $push: { orderList: data.orderList } })
    res.json({ message: 'Data order berhasil di push', data: pushData })
}

export const cancelOrder = async (req: { query: Query }, res: Response) => {
    if (!req.query.orderId) {
        return res.json({ message: "isi tidak ada", format: 'orderId' })
    }
    try {
        let response = await orderDb.findOne({ vendorId: req.query.vendorId, 'orderList._id': new ObjectId(req.query.orderId) },
            { 'orderList.$': 1 })
        if (response == null) {
            res.json({ message: 'Vendor Atau Booking tidak ada' })
        } else {
            res.json(response)
        }
    } catch (error) {
        res.json(error)
    }

}