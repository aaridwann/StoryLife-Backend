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
    eventDate: number,
    eventLocation: { street: string, city: string, province: string, state: string }
    eventCategory: string
    vendor: Array<VendorList>
    totalCost: number
}
interface EventModelInterface {
    userId: string
    event: EventList
}

const event = new mongoose.Schema<EventModelInterface>({
    userId: { type: String, required: true },
    event: {
        eventName: { type: String, trim: true, lowercase: true },
        eventDate: Number,
        eventLocation: { street: String, city: String, province: String, state: String },
        eventCategory: { type: String, enum: categoryProject, required: true, },
        vendor: [{
            vendorId: { type: String, default: '', lowercase: true, trim: true },
            vendorName: { type: String, default: '', lowercase: true, trim: true },
            vendorCategory: { type: String, enum: vendorCategory },
            vendorPhone: [{ first: {type:String, default:''}, second:{type:String, default:''} }],
            package: [{
                packageId: String, packageName: String,
                category: String, price: Number, discount: Number,
                total: Number,
            }],
        }],
        totalCost: { type: Number, default: 0, min: 0 },
    }

})

export const eventDb = mongoose.model('event', event)