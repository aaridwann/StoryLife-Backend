import { orderDb, OrderSchema } from "../Models/OrderModels";
import { BookingInformation, Vendor, Client } from "./BookingController";
import { Response } from "express";

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
    // return res.json(data)


    let orderData: any = new orderDb(data).save(async (err: any) => {
        if (err) {
            return pushOrder(data, res);
            // return res.json(err)
        }
        return res.json({ message: 'Order telah dibuat', data: orderData });
    })




}



async function pushOrder(data: OrderSchema, res: any): Promise<void> {
    let pushData = await orderDb.updateOne({ vendorId: data.vendorId, vendorName: data.vendorName },
        { $push: { orderList: data.orderList } })
    res.json({ message: 'Data order berhasil di push', data: pushData })

}