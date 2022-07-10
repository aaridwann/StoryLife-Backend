
import mongoose from "mongoose";

export interface ScheduleFormat {
    eventId: String
    eventName: String
    eventDate: number
}

export interface ScheduleVendor {
    vendorId: String
    vendorName: String
    scheduleList: Array<ScheduleFormat>
}
const schedule = new mongoose.Schema<ScheduleVendor>({
    vendorId: { type: String, required: true, unique: true },
    vendorName: { type: String, required: true, unique: true },
    scheduleList: [
        {
            eventId: { type: String },
            eventName: { type: String },
            eventDate: { type: Number }
        } 
    ]
})
export const scheduleDb = mongoose.model('schedule', schedule)