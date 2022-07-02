import { bookingDb } from "../../../Models/BookingModels"

// Create Booking document in user first registered

export const CreateBookingDocument = async (id: string, username: string) => {

    try {
        let res = new bookingDb({ userId: id, userName: username })
        let exec = await res.save()
        if (!exec) {
            return false
        }
        return true
    } catch (error) {
        return false
    }



}
