import mongoose from "mongoose";

const mongo = require('mongoose');

const categoryVendor = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']
const bookingStatus = ['rejected', 'pending', 'accepted']

export interface PackageListInterface {
    _id: string
    packageName: string
    description: string
    price: number
    discount: number
    quantity: number
    total: number
    notes: string
}
export interface BookingListInterface {
    bookingInformation: {
        eventName: string
        eventId: string
        location: { street: string, city: string, province: string, state: string },
        eventDate: number
        bookingDate: number
        bookingStatus: boolean
        paidStatus: boolean
    },
    vendorInformation: {
        vendorId: string
        vendorName: string
        vendorAddress: { street: string, city: string, province: string, state: string }
        vendorPhone: Array<{ first: string, second: string }>
        vendorCategory: string
        package: Array<PackageListInterface>
    },
    clientInformation: {
        clientId: string
        clientName: string
        clientAddress: string
        clientPhone: Array<{ first: string, second: string }>
    }
}

export interface BookingInterface {
    userId: string
    userName: string
    bookingList: Array<BookingInterface>
}

const booking = new mongoose.Schema<BookingInterface>({
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    bookingList: [{
        bookingInformation: {
            eventName: { type: String, required: true },
            eventId: { type: String },
            location: { street: String, city: String, province: String, state: String },
            eventDate: { type: Number },
            bookingDate: { type: Number },
            bookingStatus: { type: Boolean },
            paidStatus: { type: Boolean },
        },
        vendorInformation: {
            vendorId: { type: String },
            vendorName: { type: String },
            vendorAddress: { street: String, city: String, province: String, state: String },
            vendorPhone: [{ first: String, second: String }],
            vendorCategory: { type: String },
            package: [{
                _id: String, packageName: String, description: String,
                price: Number, discount: Number, quantity: Number, total: Number, notes: String
            }],
        },
        clientInformation: {
            clientId: String,
            clientName: String,
            clientAddress: String,
            clientPhone: [{ first: String, second: String }]
        }
        , default: []
    }]
})

export const bookingDb = mongoose.model('booking', booking)

// const booking = new mongo.Schema({
//     // Booking information
//     eventName: { type: String, required: true },
//     eventId: { type: String, required: true },
//     location: { type: Object, required: true },
//     bookingDate: { type: String, required: true, default: new Date().toString() },
//     eventDate: { type: String, required: true },
//     bookingStatus: { type: String, enum: bookingStatus },
//     paidStatus: { type: Boolean, default: false },

//     // Vendor
//     vendorId: { type: String, required: true },
//     vendorName: { type: String, required: true },
//     vendorAddress: { type: String, required: true },
//     vendorPhone: { type: Array, required: true },
//     vendorCategory: { type: String, enum: categoryVendor },
//     package: [{
//         _id: { type: String, required: true },
//         packageName: { type: String, required: true },
//         details: { type: String, required: true },
//         price: { type: Number, required: true },
//         discount: { type: Number, default: 0 },
//         quantity: { type: Number, required: true, min: 1 },
//         total: { type: Number, default: 0 }
//     }, { required: true }],
//     notes: { type: String, default: "" },

//     // Klien
//     clientId: { type: String, required: true },
//     clientName: { type: String, required: true },
//     clientAddress: { type: String, required: true },
//     clientPhone: { type: String, required: true }

// })

// module.exports = mongo.model('booking', booking)