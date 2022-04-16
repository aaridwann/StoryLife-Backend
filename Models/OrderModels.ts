import mongoose from "mongoose";
// client eventId event detail package

interface Order {
    vendorId: string
    client: Client,
    project: Project,
}
interface Client {
    clientId: string,
    clientName: string,
    clientAddress: string,
    clientPhone: Array<string>,
}
interface Location {
    steet: string,
    city: string,
    province: string
    state: string
}
interface Project {
    projectId: string,
    projectName: string,
    projectDate: string,
    bookingDate: string
    location: Location,
    category: string,
    bookingStatus: 'pending' | 'accepted' | 'rejected'
    paidStatus: boolean
}
const order = new mongoose.Schema<Order>({
    vendorId: { type: String, required: true },
    client: { type: Object, required: true },
    project: { type: Object, required: true },
    // package:{type:Object,required:true}

}, { timestamps: true })

export const orderDb = mongoose.model('order',order)