import mongoose from "mongoose";

interface Package {
    name: String
    details: String
    price: number
    discount: number
    quantity: number
    total: number
    category: string
    packageId: string
}

export interface OrderList {
    bookingId: string,
    eventName: string,
    clientName: string
    orderDetail: {
        eventName: string
        eventId: string
        eventLocation: { street: string, city: string, province: string, state: string }
        bookingDate: number
        eventDate: number
        package: [Package]
        notes: string
        clientId: string
        clientName: string
        clientAddress: { street: string, city: string, province: string, state: string }
        clientPhone: string
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
        bookingId: String,
        eventName: { type: String, required: true },
        clientName: { type: String, required: true },
        orderDetail: {
            eventName: { type: String, required: true },
            eventId: { type: String, required: true },
            eventLocation: { street: String, city: String, province: String, state: String },
            bookingDate: { type: Number, required: true },
            eventDate: { type: Number, required: true },
            package: [{
                packageName: { type: String, required: true },
                details: { type: String, required: true },
                category: String,
                packageId: String,
                price: { type: Number, required: true },
                discount: { type: Number, required: true },
                quantity: { type: Number, required: true },
                total: { type: Number, required: true },
            }],
            notes: { type: String, default: '' },
            clientId: { type: String, required: true },
            clientName: { type: String, required: true },
            clientAddress: { street: String, city: String, province: String, state: String },
            clientPhone: { type: String, required: true },
        },
        status: {
            bookingStatus: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
            paidStatus: { type: Boolean, default: false }
        }
    }]
})
export const orderDb = mongoose.model('order', order)