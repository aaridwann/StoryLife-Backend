import { ObjectId } from "mongodb";
import { bookingDb } from "../../../../Models/BookingModels";


export const AbortBooking = async (userId: string, eventId: string): Promise<{ state: boolean, message: string }> => {
    try {
        const abort = await bookingDb.updateOne({ userId: userId }, { $pull: { bookingList: { 'bookingInformation.eventId': eventId } } })
        if (!abort.modifiedCount) return { state: false, message: 'abort booking failed' }
        return { state: true, message: 'success abort booking' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}