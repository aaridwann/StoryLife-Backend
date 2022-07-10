import { ObjectId } from 'mongodb'
import { orderDb, OrderList } from '../../../../Models/OrderModels'



export const addOrder = async (data: any, bookingId: string): Promise<{ state: boolean, message: any }> => {
    // 1. Init data
    const Data: OrderList = {
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
    }
    try {
        const push = await orderDb.findOneAndUpdate<OrderList>({ vendorId: data.vendorInformation.vendorId }, { $push: { orderList: Data } }, { returnNewDocument: true })
        if (!push) return { state: false, message: 'add order failed' }
        return { state: true, message: push }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}




// 2. ABORT ORDER
export const abortOrder = async (vendorId: string, eventId: string) => {
    try {
        const abort = await orderDb.updateOne({ vendorId: vendorId }, { $pull: { orderList: { 'orderDetail.eventId': eventId } } })
        if (!abort.modifiedCount) return { state: false, message: 'abort order failed' }
        return { state: true, message: 'success abort order' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}