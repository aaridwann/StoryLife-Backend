import { ObjectId } from "mongodb"
import { eventDb } from "../../../../Models/EventModels"


export const middlewareAlreadyBooking = async (eventId: string, packageId: string): Promise<{ state: boolean, message: string }> => {
    try {
        const check = await eventDb.findOne({ event: { $elemMatch: { _id: new ObjectId(eventId), 'vendor': { $elemMatch: { 'package._id': new ObjectId(packageId) } } } } }, { 'event.vendor.$': 1 })
        if (check) return { state: false, message: 'you already booking' }
        return { state: true, message: 'ok' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}