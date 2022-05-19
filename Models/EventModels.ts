import mongoose from "mongoose";
export const categoryProject = ['wedding', 'party', 'prewedding', 'birthday', 'engagement', 'religion']

let vendorCategory = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']

interface PackageList {
    packageId: string
    packageName: string
    category: string
    price: number
    discount: number
}
interface VendorList {
    vendorId: string
    vendorName: string
    vendorCategory: string
    vendorPhone: [{ first: string, second: string }]
    vendorAddress: { street: string, city: string, province: string, state: string }
    package: Array<PackageList>
    total: number,
}
interface EventList {
    eventName: string,
    eventDate: number,
    eventLocation: { street: string, city: string, province: string, state: string }
    eventCategory: typeof categoryProject
    vendor: Array<VendorList>
    totalCost: number
}
interface EventModelInterface {
    userId: string
    clientName: string
    eventList: Array<EventList>
}

const event = new mongoose.Schema<EventModelInterface>({
    userId: { type: String, required: true },
    clientName: { type: String, required: true },
    eventList: [{
        eventName: String,
        eventDate: Number,
        eventLocation: { street: String, city: String, province: String, state: String },
        eventCategory: { type: String, enum: categoryProject },
        vendor: [{
            vendorId: String,
            vendorName: String,
            vendorCategory: { type: String, enum: vendorCategory },
            vendorPhone: [{ first: String, second: String }],
            package: [{
                packageId: String, packageName: String,
                category: String, price: Number, discount: Number,
                total: Number,
            }],
            default: []
        }],
        totalCost: Number
        , default: []
    }]
    // date: { type: Date, required: true },
    // location: { type: Object, required: true, default: '' },
    // category: { type: String, enum: categoryProject, required: true },
    // vendor: { type: Array, default: null },
    // totalCost: { type: Number, required: true, default: 0 }

})

export const eventDb = mongoose.model('event', event)