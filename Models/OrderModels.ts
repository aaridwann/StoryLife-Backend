import mongoose from "mongoose";

interface Package {
    name: String
    details: String
    price: number
    discount: number
    quantity: number
    total: number
}

interface OrderList {
    orderId: String,
    eventName: String,
    clientName: String
    orderDetail: {
        eventName: String
        eventId: String
        location: Object
        bookingDate: Date
        eventDate: Date
        package: Array<object>,
        notes: String
        clientId: String
        clientName: String
        clientAddress: String
        clientPhone: String
    }
    status: {
        bookingStatus: 'pending' | 'accepted' | 'rejected',
        paidStatus: boolean
    }
}

export interface OrderSchema {
    vendorId: String
    vendorName: String
    orderList: Array<OrderList>
}


const order = new mongoose.Schema<OrderSchema>({
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true, unique: true },
    orderList: [{
        orderId: { type: String, required: true },
        eventName: { type: String, required: true },
        clientName: { type: String, required: true },
        orderDetail: {
            eventName: { type: String, required: true },
            eventId: { type: String, required: true },
            location: { type: Object, required: true },
            bookingDate: { type: Date, required: true },
            eventDate: { type: Date, required: true },
            package: [{
                name: { type: String, required: true },
                details: { type: String, required: true },
                price: { type: Number, required: true },
                discount: { type: Number, required: true },
                quantity: { type: Number, required: true },
                total: { type: Number, required: true },
            }],
            notes: { type: String, default:'' },
            clientId: { type: String, required: true },
            clientName: { type: String, required: true },
            clientAddress: { type: String, required: true },
            clientPhone: { type: String, required: true },
        },
        status: {
            bookingStatus: { type: String, enum: ['pending', 'accepted', 'rejected'], required: true },
            paidStatus: { type: Boolean, required: true }
        }
    }]
})
export const orderDb = mongoose.model('order', order)