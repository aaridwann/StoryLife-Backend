import mongoose from "mongoose";
export const categoryEvent = ['wedding', 'party', 'prewedding', 'birthday', 'engagement', 'religion']
export let vendorCategory = ['photography', 'videography', 'makeup artist', 'gawn', 'decoration', 'invitation', 'venue', 'mc', 'entertainment', 'wedding service']

interface PackageList {
    packageId: string
    packageName: string
    category: string
    price: number
    discount: number
}
export interface VendorList {
    vendorId?: string
    vendorName?: string
    vendorCategory?: string
    vendorPhone?: [{ first: string, second: string }]
    vendorAddress?: { street: string, city: string, province: string, state: string }
    package?: Array<PackageList>
    total?: number,
}
export interface EventList {
    eventName: string,
    eventDate: Date,
    eventLocation: { street: string, city: string, province: string, state: string }
    eventCategory: string
    vendor: Array<VendorList>
    totalCost: number
}
export interface EventModelInterface {
    userId: string
    userName: string
    event: Array<EventList>
}
const event = new mongoose.Schema<EventModelInterface>({
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    event: [{
        eventName: { type: String, trim: true, lowercase: true },
        eventDate: Number,
        eventLocation: { street: String, city: String, province: String, state: String },
        eventCategory: { type: String, enum: categoryEvent },
        vendor: [{
            vendorId: { type: String, default: '', lowercase: true, trim: true },
            vendorName: { type: String, default: '', lowercase: true, trim: true },
            vendorCategory: { type: String, enum: vendorCategory },
            vendorPhone: { phone1: { type: String, default: '' }, phone2: { type: String, default: '' } },
            package: [{
                packageId: String, packageName: String,
                category: String, price: Number, discount: Number,
                total: Number,
            }],
        }],
        totalCost: { type: Number, default: 0, min: 0 },
    }]

})




export const eventDb = mongoose.model('event', event)